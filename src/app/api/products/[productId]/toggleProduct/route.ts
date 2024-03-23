import prisma from "db/prisma";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import type { NextRequest } from "next/server";

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

  if (!productId) {
    return new Response(JSON.stringify({ error: "Product ID not informed" }), {
      status: 400,
    });
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

  // Update the isActive status in your Prisma database
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: { isActive: !existentProduct.isActive },
  });

  const output = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
  };
  //console.log(output);
  return new Response(
    JSON.stringify({ message: "Product inactivated", product: output })
  );
}
