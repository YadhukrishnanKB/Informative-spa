"use client";

import Link from "next/link";

export default function Footer() {

  return (
    <footer className="text-white bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif tracking-wider uppercase">Sephoraspa</h3>
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
              <p>Door No.2601/A 2nd floor,Elanjikkal Tower Near Alibaba restaurant,Above Reporter T.V,11th Cross Road,Panampilliy Nagar-682036</p>
              <Link className="mb-4" href="tel:+919567476609">
                Connect with us: +91 95674 76609
              </Link>
              <br />
              <Link href="mailto:sephoraspa7@gmail.com">
                Email: sephoraspa7@gmail.com
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-xs">
          <p>&copy; {new Date().getFullYear()} Sephoraspa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
