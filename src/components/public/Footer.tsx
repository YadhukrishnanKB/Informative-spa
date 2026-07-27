"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/Logo.png";

export default function Footer() {
  const [logoText, setLogoText] = useState("Sephoraspa");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [email, setEmail] = useState("hello@sephoraspa.com");

  useEffect(() => {
    fetch("/api/theme")
      .then((r) => r.json())
      .then((data) => {
        if (data.logoText) setLogoText(data.logoText);
        if (data.phone) setPhone(data.phone);
        if (data.email) setEmail(data.email);
      })
      .catch(() => { });
  }, []);

  return (
    <footer className="text-white bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            {/* <h3 className="text-xl font-bold mb-4 font-serif tracking-wider uppercase">{logoText}</h3> */}
            <Image src={logo} alt="Logo" width={180} height={80} />
            <p className="text-white/80 leading-relaxed text-sm">
              Experience the ultimate relaxation at our premium spa. We offer a wide range of treatments to rejuvenate your body and mind.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-white/80 hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="block text-white/80 hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="block text-white/80 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">Contact Info</h3>
            <div className="space-y-2 text-white/80 text-sm">
              <p>123 Wellness Avenue, New York, NY 10001</p>
              <p>Phone: {phone}</p>
              <p>Email: {email}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-xs">
          <p>&copy; {new Date().getFullYear()} {logoText}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
