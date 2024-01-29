import type { NextApiRequest } from "next";
import prisma from "../../../../../db/prisma";

interface GetProductsRequest extends NextApiRequest {}

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
