import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(messages);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const message = await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    },
  });
  return Response.json(message, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id, read } = await req.json();
  const msg = await prisma.contactMessage.update({ where: { id }, data: { read } });
  return Response.json(msg);
}
