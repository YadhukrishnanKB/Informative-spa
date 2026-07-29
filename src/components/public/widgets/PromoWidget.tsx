"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  content: any;
}

export default function PromoWidget({ content }: Props) {
  const { heading, description, buttonText, buttonLink, backgroundImage, overlayColor, overlayOpacity } = content || {};

  if (!heading && !description) return null;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0">
          <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor || "#0a3d3d",
          opacity: ((overlayOpacity ?? 70) / 100),
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {heading && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif"
          >
            {heading}
          </motion.h2>
        )}
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}
        {buttonText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={buttonLink || "#"}
              className="inline-block px-10 py-4 bg-white text-black font-bold tracking-wider hover:bg-[#d4a373] hover:text-white transition-all duration-300 shadow-xl rounded hover:scale-105 active:scale-95"
            >
              {buttonText}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
