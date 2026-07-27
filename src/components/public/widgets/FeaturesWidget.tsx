"use client";

import { motion } from "framer-motion";

interface Props {
  content: any;
}

export default function FeaturesWidget({ content }: Props) {
  const { heading, items } = content || {};

  if (!items?.length) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: "var(--primary)" }}
          >
            {heading}
          </motion.h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              style={{ borderRadius: "var(--radius)" }}
            >
              {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
              {item.title && <h3 className="text-xl font-semibold mb-2">{item.title}</h3>}
              {item.description && <p className="text-gray-600">{item.description}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
