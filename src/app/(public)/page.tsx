import { prisma } from "@/lib/prisma";
import WidgetRenderer from "@/components/public/WidgetRenderer";

export async function generateMetadata() {
  const page = await prisma.page.findUnique({ where: { slug: "home" } });
  return {
    title: page?.metaTitle || "Home",
    description: page?.metaDesc || "",
  };
}

export default async function HomePage() {
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
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
