import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export const metadata: Metadata = {
  title: {
    default: "Serenity Spa | Luxury Spa & Wellness",
    template: "%s | Serenity Spa",
  },
  description: "Experience premium spa treatments, massages, and wellness therapies at Serenity Spa. Book your session today.",
  keywords: ["spa", "wellness", "massage", "relaxation", "beauty", "wellness center"],
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
