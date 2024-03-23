import { NextRequest } from "next/server";
import prisma from "@/../db/prisma";

interface GetCategoriesRequest extends NextRequest {}

export async function GET(req: GetCategoriesRequest) {
  try {
    const result = await prisma.category.findMany();
    return new Response(JSON.stringify(result));
  } catch (err) {
    return new Response(err);
  }
}

interface PostCategoriesRequest extends NextRequest {}

export async function POST(req: PostCategoriesRequest) {
  const body = await req.formData();

  const name = body.get("name")?.toString();
  const description = body.get("description")?.toString();

  if (!name || !description) {
    return new Response(JSON.stringify({ ok: false }));
  }

  try {
    const result = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return new Response(JSON.stringify(result));
  } catch (err) {
    return new Response(err);
  }
}
