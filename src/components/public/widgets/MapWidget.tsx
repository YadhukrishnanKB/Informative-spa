"use client";

import { motion } from "framer-motion";

interface Props {
  content: any;
}

export default function MapWidget({ content }: Props) {
  const { heading, address, embedUrl, height } = content || {};

  if (!embedUrl) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: "var(--primary)" }}
          >
            {heading}
          </motion.h2>
        )}
        {address && (
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{address}</p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl"
          style={{ borderRadius: "var(--radius)" }}
        >
          <iframe
            src={embedUrl}
            width="100%"
            height={height || 450}
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={heading || "Map"}
          />
        </motion.div>
      </div>
    </section>
  );
}
