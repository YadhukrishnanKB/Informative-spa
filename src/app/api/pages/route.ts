import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET() {
  const pages = await prisma.page.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { widgets: true } } },
  });
  return Response.json(pages);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const page = await prisma.page.create({
    data: {
      slug: data.slug,
      title: data.title,
      metaTitle: data.metaTitle || null,
      metaDesc: data.metaDesc || null,
      published: data.published ?? true,
    },
  });
  return Response.json(page);
}
