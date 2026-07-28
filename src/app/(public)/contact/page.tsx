import { getPayload } from 'payload'
import config from '@payload-config'
import WidgetRenderer from "@/components/public/WidgetRenderer";

export async function generateMetadata() {
  const payload = await getPayload({ config })
  const pages = await payload.find({ collection: 'pages', where: { slug: { equals: 'contact' } }, limit: 1 })
  const page = pages.docs[0]
  return {
    title: (page?.metaTitle as string) || "Contact Us",
    description: (page?.metaDesc as string) || "",
  };
}

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const pages = await payload.find({ collection: 'pages', where: { slug: { equals: 'contact' } }, limit: 1 })
  const page = pages.docs[0]

  if (!page) return <div className="pt-20 text-center">Page not found</div>;

  const widgets = (page as any).widgets || [];

  return (
    <>
      {widgets.map((widget: any, index: number) => (
        <WidgetRenderer key={widget.id || index} widget={widget} />
      ))}
    </>
  );
}
