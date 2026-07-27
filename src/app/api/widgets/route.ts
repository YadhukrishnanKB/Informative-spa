import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get("pageId");
  const where = pageId ? { pageId } : {};
  const widgets = await prisma.widget.findMany({ where, orderBy: { order: "asc" } });
  return Response.json(widgets);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const maxOrder = await prisma.widget.aggregate({ where: { pageId: data.pageId }, _max: { order: true } });
  const widget = await prisma.widget.create({
    data: {
      type: data.type,
      title: data.title || null,
      content: data.content || null,
      settings: data.settings || null,
      pageId: data.pageId,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });
  return Response.json(widget);
}
