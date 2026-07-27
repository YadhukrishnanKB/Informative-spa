import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
    include: { widgets: { orderBy: { order: "asc" } } },
  });
  if (!page) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(page);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const page = await prisma.page.update({
    where: { id },
    data: {
      slug: data.slug,
      title: data.title,
      metaTitle: data.metaTitle ?? null,
      metaDesc: data.metaDesc ?? null,
      published: data.published ?? true,
    },
  });
  return Response.json(page);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.page.delete({ where: { id } });
  return Response.json({ success: true });
}
