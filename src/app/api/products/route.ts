import Stripe from "stripe";

import type { NextRequest } from "next/server";
import prisma from "@/../db/prisma";
import { randomUUID } from "crypto";

import { stripe } from "@/lib/stripe";

interface GetProductsRequest extends NextRequest {}

export async function GET(req: GetProductsRequest) {
  try {
    const result = await prisma.product.findMany();
    return new Response(JSON.stringify(result));
  } catch (err) {
    return new Response(err);
  }
}

interface PostProductsRequest extends NextRequest {}

export async function POST(req: PostProductsRequest) {
  try {
    const body = await req.formData();

    const name = body.get("name")?.toString();
    const description = body.get("description")?.toString();
    const category = body.get("category")?.toString();
    const price = body.get("price")?.valueOf() as number;
    const image = body.get("image");

    if (!name || !description || !category || !price) {
      return new Response(JSON.stringify({ ok: false }));
    }

    let imageUrl = undefined;

    if (body.get("image")) {
      console.log("Uploading image to Stripe...");
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

    console.log(imageUrl);

    const input = {
      name: name!,
      description: description,
      default_price_data: {
        currency: "brl",
        unit_amount: Math.ceil(price * 100),
      },
      metadata: {
        category: category!,
      },
    } as Stripe.ProductCreateParams;

    if (imageUrl) {
      input.images = [imageUrl];
    }

    const product = await stripe.products.create(input);

    await prisma.product.create({
      data: {
        id: product.id,
        name: name,
        description: description,
        category: category,
        imageUrl: imageUrl,
        isActive: product.active,
        price: Number(price),
        createdAt: new Date(),
      },
    });

    return new Response(JSON.stringify({ product }));
  } catch (err) {
    return new Response(err);
  }
}
("");
