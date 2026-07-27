import type { Widget } from "@/types";
import HeroWidget from "./widgets/HeroWidget";
import ContentWidget from "./widgets/ContentWidget";
import FeaturesWidget from "./widgets/FeaturesWidget";
import TestimonialsWidget from "./widgets/TestimonialsWidget";
import ContactWidget from "./widgets/ContactWidget";
import VideoWidget from "./widgets/VideoWidget";
import GalleryWidget from "./widgets/GalleryWidget";
import PackagesWidget from "./widgets/PackagesWidget";

interface Props {
  widget: Widget;
}

export default function WidgetRenderer({ widget }: Props) {
  const content = widget.content ? JSON.parse(widget.content) : {};

  switch (widget.type) {
    case "hero":
      return <HeroWidget content={content} />;
    case "content":
      return <ContentWidget content={content} />;
    case "features":
      return <FeaturesWidget content={content} />;
    case "testimonials":
      return <TestimonialsWidget content={content} />;
    case "contact":
      return <ContactWidget content={content} />;
    case "video":
      return <VideoWidget content={content} />;
    case "gallery":
      return <GalleryWidget content={content} />;
    case "packages":
      return <PackagesWidget content={content} />;
    default:
      return null;
  }
}
