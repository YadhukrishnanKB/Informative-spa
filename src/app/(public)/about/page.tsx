import { prisma } from "@/lib/prisma";
import WidgetRenderer from "@/components/public/WidgetRenderer";

export async function generateMetadata() {
  const page = await prisma.page.findUnique({ where: { slug: "about" } });
  return {
    title: page?.metaTitle || "About Us",
    description: page?.metaDesc || "",
  };
}

export default async function AboutPage() {
  const page = await prisma.page.findUnique({
    where: { slug: "about" },
    include: { widgets: { orderBy: { order: "asc" } } },
  });

  if (!page) return <div className="pt-20 text-center">Page not found</div>;

  return (
    <>
      {page.widgets.map((widget) => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}
    </>
  );
}
