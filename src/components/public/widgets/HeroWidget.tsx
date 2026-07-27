"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ThreeParticles from "@/components/public/ThreeParticles";

interface Props {
  content: any;
}

export default function HeroWidget({ content }: Props) {
  const { heading, subheading, description, buttonText, buttonLink, image } = content || {};

  // Use generated premium hero background image if none specified
  const bgImage = image || "/hero-bg.png";

  const locations = [
    { name: "Edappally" },
    { name: "MG Road" },
    { name: "Thoppumpady" },
    { name: "Thrippunithura" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[#0e1311]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1311]/95 via-[#0e1311]/70 to-[#0e1311]/45 z-20" />
        <ThreeParticles />
        <img src={bgImage} alt={heading || "Spa background"} className="w-full h-full object-cover opacity-40" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 w-full flex flex-col justify-between min-h-[80vh]">
        <div /> {/* Spacer for vertical distribution */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl text-left"
        >
          {subheading && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block tracking-wider uppercase text-xs font-semibold mb-6 px-3 py-1 rounded border border-white/20 text-white/90 bg-white/5"
            >
              {subheading}
            </motion.span>
          )}

          <h1 className="text-5xl md:text-7xl font-medium text-white mb-6 leading-tight tracking-tight font-serif">
            Everyone deserves <br />
            <span className="text-[#d4a373]">a good massage </span>
            {/* <span className="inline-block animate-bounce">😊</span> */}
          </h1>

          {/* Locations grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-xl">
            {locations.map((loc, index) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 text-white/90"
              >
                <svg className="w-5 h-5 text-[#d4a373]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold tracking-wide">{loc.name}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-base md:text-lg text-white/70 mb-10 max-w-2xl leading-relaxed">
            {description || "Discover unparalleled relaxation and luxury at Protone Day Spa, with premium locations. Experience our exquisite interiors, expert therapists, and exceptional hospitality."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href={buttonLink || "/contact"}
              className="px-10 py-4 bg-white text-black font-bold tracking-wider hover:bg-[#d4a373] hover:text-white transition-all duration-300 shadow-xl rounded hover:scale-105 active:scale-95"
            >
              {buttonText || "CALL NOW"}
            </Link>
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center justify-center text-white/40 hover:text-white/80 cursor-pointer pt-12"
        >
          <span className="text-xs uppercase tracking-widest font-semibold mb-2">Scroll Down</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
