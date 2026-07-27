import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET() {
  const settings = await prisma.themeSetting.findMany();
  const theme: Record<string, string> = {};
  for (const s of settings) {
    theme[s.key] = s.value;
  }
  return Response.json(theme);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  for (const [key, value] of Object.entries(data)) {
    await prisma.themeSetting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }
  return Response.json({ success: true });
}
