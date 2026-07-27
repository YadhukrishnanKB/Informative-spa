import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const widget = await prisma.widget.findUnique({ where: { id } });
  if (!widget) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(widget);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const widget = await prisma.widget.update({
    where: { id },
    data: {
      type: data.type,
      title: data.title ?? null,
      content: data.content ?? null,
      settings: data.settings ?? null,
      order: data.order,
      pageId: data.pageId,
    },
  });
  return Response.json(widget);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.widget.delete({ where: { id } });
  return Response.json({ success: true });
}
