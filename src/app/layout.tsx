import type { Metadata } from "next";
import "@payloadcms/next/css";

export const metadata: Metadata = {
  title: "Sephoraspa | Luxury Spa & Wellness Sanctuary",
  description: "Experience premium spa treatments, massages, and wellness therapies at Sephoraspa.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
