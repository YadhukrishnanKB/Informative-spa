import HeroWidget from "./widgets/HeroWidget";
import ContentWidget from "./widgets/ContentWidget";
import FeaturesWidget from "./widgets/FeaturesWidget";
import TestimonialsWidget from "./widgets/TestimonialsWidget";
import ContactWidget from "./widgets/ContactWidget";
import VideoWidget from "./widgets/VideoWidget";
import GalleryWidget from "./widgets/GalleryWidget";
import PackagesWidget from "./widgets/PackagesWidget";

interface Props {
  widget: any;
}

export default function WidgetRenderer({ widget }: Props) {
  // Payload blocks use blockType; legacy widgets use type
  const blockType = widget.blockType || widget.type;

  // Payload blocks have data directly on the object;
  // legacy widgets stored content as a JSON string
  const content = widget.content ? (typeof widget.content === 'string' ? JSON.parse(widget.content) : widget.content) : widget;

  switch (blockType) {
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
