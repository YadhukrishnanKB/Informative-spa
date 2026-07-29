"use client";

import { motion } from "framer-motion";

interface Props {
  content: any;
}

export default function StatsWidget({ content }: Props) {
  const { heading, description, items } = content || {};

  if (!items?.length) return null;

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
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              style={{ borderRadius: "var(--radius)" }}
            >
              {item.icon && <div className="text-4xl mb-3">{item.icon}</div>}
              {item.number && (
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: "var(--primary)" }}
                >
                  {item.number}
                </div>
              )}
              {item.label && (
                <div className="text-gray-600 font-medium">{item.label}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
