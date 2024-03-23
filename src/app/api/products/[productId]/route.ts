import type { NextRequest } from "next/server";
import prisma from "@/../db/prisma";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { randomUUID } from "crypto";

interface GetProductsRequest extends NextRequest {}

interface GetProductByIdParams {
  params: {
    productId: string;
  };
}

export async function GET(
  req: GetProductsRequest,
  { params }: GetProductByIdParams
) {
  try {
    const { productId } = params;

    const result = await prisma.product.findFirst({
      where: productId ? { id: productId } : undefined,
    });

    return new Response(JSON.stringify(result));
  } catch (err) {
    return new Response(err);
  }
}

interface PutProductsRequest extends NextRequest {}

interface PutProductByIdParams {
  params: {
    productId: string;
  };
}

export async function PUT(
  req: PutProductsRequest,
  { params }: PutProductByIdParams
) {
  const { productId } = params;
  const body = await req.formData();

  const name = body.get("name")?.toString();
  const description = body.get("description")?.toString();
  const category = body.get("category")?.toString();
  const price = body.get("price")?.valueOf() as number;
  let currentImageUrl = body.get("imageUrl")?.toString();
  const image = body.get("image");

  if (!name || !description || !category || !price) {
    return new Response(JSON.stringify({ ok: false }));
  }

  let imageUrl = undefined;

  // Updated image file upload

  if (body.get("image")) {
    const { id } = await stripe.files.create({
      purpose: "product_image" as any,
      file: {
        data: Buffer.from(await (image as any)?.arrayBuffer()),
        name: `${name}-${randomUUID()}.png`,
      },
    });

    if (id) {
      const fileLink = await stripe.fileLinks.create({
        file: id,
      });
      imageUrl = fileLink.url;
    }
  }
  // Retrieve existent product from Stripe to check the price

  const product = await stripe.products.retrieve(productId);

  let updatedPrice = undefined;
  // Retrieves the current price if the product exists

  if (product) {
    const currentPrice = await stripe.prices.retrieve(
      product.default_price as string
    );
    // Update product price if it's different from the current one
    if (currentPrice.unit_amount / 100 !== Math.ceil(Number(price) * 100)) {
      updatedPrice = await stripe.prices.create({
        product: product.id,
        currency: "brl",
        unit_amount: Math.ceil(Number(price) * 100),
      });
    } else {
      updatedPrice = Number(currentPrice);
    }
  }

  // Create the input to update the product on Stripe
  const input = {
    name: name!,
    description: description,
    default_price: updatedPrice.id,
    metadata: {
      category: category!,
    },
  } as Stripe.ProductCreateParams;

  // Add the image URL to the input if it exists
  if (imageUrl) {
    input.images = [imageUrl];
  }

  const updatedProduct = await stripe.products.update(
    productId,
    input as Stripe.ProductUpdateParams
  );

  const result = await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      description,
      category,
      price: Number(price),
      imageUrl: imageUrl || currentImageUrl,
      updatedAt: new Date(),
    },
  });

  return new Response(JSON.stringify(result));
}
