import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Preloader from "@/components/public/Preloader";
import { prisma } from "@/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sephoraspa | Luxury Spa & Wellness Sanctuary",
  description: "Experience premium spa treatments, massages, and wellness therapies at Sephoraspa.",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let themeCSS = "";
  try {
    const settings = await prisma.themeSetting.findMany();
    for (const s of settings) {
      themeCSS += `--${s.key}: ${s.value};`;
    }
  } catch {}

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <style>{`:root {${themeCSS}}`}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <SessionProvider>
          <Preloader />
          {children}
          {/* Floating WhatsApp Chat Widget */}
          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 hover:bg-[#20ba5a] active:scale-95 transition-all duration-300 group"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.001-2.63-1.019-5.101-2.871-6.958C16.612 1.984 14.145.962 11.517.962c-5.44 0-9.866 4.415-9.869 9.85-.001 1.77.464 3.498 1.347 5.018l-.972 3.55 3.642-.955zm11.233-5.26c-.268-.134-1.585-.782-1.831-.872-.247-.09-.427-.134-.607.134-.18.269-.696.872-.853 1.05-.157.18-.314.202-.583.068-.268-.134-1.134-.418-2.16-1.334-.798-.711-1.336-1.59-1.493-1.859-.157-.269-.017-.414.118-.548.12-.121.268-.314.402-.471.134-.157.18-.269.269-.448.09-.18.045-.336-.022-.471-.067-.134-.607-1.462-.831-2.001-.219-.527-.459-.456-.607-.463-.156-.007-.336-.008-.517-.008-.18 0-.472.067-.719.336-.247.269-.943.921-.943 2.247 0 1.326.963 2.607 1.097 2.787.134.18 1.9 2.901 4.6 4.07 1.082.469 1.92.756 2.576.963 1.085.344 2.073.297 2.855.18.871-.13 1.585-.646 1.831-1.272.246-.627.246-1.164.18-1.272-.067-.109-.247-.179-.516-.313z"/>
            </svg>
            <span className="font-semibold text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
              Chat with us
            </span>
          </a>
        </SessionProvider>
      </body>
    </html>
  );
}
