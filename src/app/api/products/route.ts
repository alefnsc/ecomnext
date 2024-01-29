import type { NextApiRequest } from "next";
import prisma from "../../../../db/prisma";

interface GetProductsRequest extends NextApiRequest {}

export async function GET(req: GetProductsRequest) {
  try {
    const result = await prisma.product.findMany();
    return new Response(JSON.stringify(result));
  } catch (err) {
    return new Response(err);
  }
}
