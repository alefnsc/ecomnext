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

  const { toggle } = await req.json();

  if (toggle) {
    if (!productId) {
      return new Response(
        JSON.stringify({ error: "Product ID not informed" }),
        {
          status: 400,
        }
      );
    }

    const existentProduct = await prisma.product.findFirst({
      where: { id: productId },
    });

    const product = await stripe.products.update(productId, {
      active: !existentProduct.isActive,
    });

    if (!product) {
      return new Response(
        JSON.stringify({ error: "It was not possible to toggle product" }),
        { status: 500 }
      );
    }

    const price = product.default_price as Stripe.Price;

    const output = {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      active: !existentProduct.isActive,
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((price.unit_amount as number) / 100),
    };

    const result = await prisma.product.update({
      where: { id: productId },
      data: { isActive: !existentProduct.isActive },
    });

    return new Response(
      JSON.stringify({ message: "Product inactivated", product: output })
    );
  }

  const body = await req.formData();

  console.log("passou aqui");

  const name = body.get("name")?.toString();
  const description = body.get("description")?.toString();
  const category = body.get("category")?.toString();
  const price = body.get("price")?.valueOf() as number;
  let currentImageUrl = body.get("imageUrl")?.toString();
  const image = body.get("image");

  console.log(name, description, category, price, currentImageUrl, image);

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
    const curentPrice = await stripe.prices.retrieve(
      product.default_price as string
    );
    // Update product price if it's different from the current one
    if (curentPrice.unit_amount !== Math.ceil(Number(price) * 100)) {
      updatedPrice = await stripe.prices.create({
        product: product.id,
        currency: "brl",
        unit_amount: Number(price),
      });
    } else {
      updatedPrice = curentPrice;
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
      price: price,
      imageUrl: imageUrl || currentImageUrl,
      updatedAt: new Date(),
    },
  });

  return new Response(JSON.stringify(result));
}
