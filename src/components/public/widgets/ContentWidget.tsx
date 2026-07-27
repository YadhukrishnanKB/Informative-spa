"use client";

import { motion } from "framer-motion";

interface Props {
  content: any;
}

export default function ContentWidget({ content }: Props) {
  const { heading, description } = content || {};

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: "var(--primary)" }}>
              {heading}
            </h2>
          )}
          {description && (
            <div className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
              {description}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
