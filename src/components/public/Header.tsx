"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "../../../public/Logo.png";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#features", label: "Features" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent backdrop-blur-md border-b border-[#2b2a28]/10">
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#d4af37] text-[#121212] text-xs font-semibold py-2 px-4 flex items-center justify-center gap-2 overflow-hidden"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Connect with us: (555) 123-4567</span>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Logo mark: droplet glyph + serif wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* <motion.svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            animate={{ scale: isScrolled ? 0.85 : 1 }}
            whileHover={{ rotate: -8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          > */}
            {/* <path
              d="M12 2.5C12 2.5 5.5 10 5.5 14.5a6.5 6.5 0 0013 0C18.5 10 12 2.5 12 2.5z"
              stroke="#b08d57"
              strokeWidth="1.4"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M8.7 15.2c0 1.9 1.5 3.4 3.3 3.4" stroke="#b08d57" strokeWidth="1" strokeLinecap="round" opacity="0.55" /> */}
          {/* </motion.svg> */}
          <div className="flex flex-col leading-none">
            <motion.span
              animate={{ scale: isScrolled ? 0.9 : 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-xl md:text-2xl font-serif tracking-[0.08em] uppercase origin-left text-[#2b2a28]"
            >
              {/* {logoText} */}
              <Image src={logo} alt="Logo" width={100} height={60} />
            </motion.span>
            {/* {!isScrolled && (
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8a8478] mt-0.5">
                Wellness &amp; Ritual
              </span>
            )} */}
          </div>
        </Link>

        <div
          className="hidden md:flex items-center gap-1 relative"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              className="relative px-3.5 py-2 text-sm font-medium text-[#E6BE8A] hover:text-[#E6BE8A] transition-colors"
            >
              {hovered === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-[#7c8f6e]/12 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-3 px-5 py-2.5 rounded-full text-[#E6BE8A] font-semibold transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider bg-[#b08d57] hover:bg-[#9c7c4c]"
          >
            Book Now
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-[#4a473f] hover:text-[#2b2a28]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f7f3ea] border-t border-[#2b2a28]/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2.5 text-[#4a473f] font-medium border-b border-[#2b2a28]/5 last:border-0"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block text-center mt-3 px-5 py-2.5 rounded-full text-[#f7f3ea] font-semibold bg-[#b08d57]"
                onClick={() => setOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}