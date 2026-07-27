"use client";

import { motion } from "framer-motion";

interface Props {
  content: any;
}

export default function TestimonialsWidget({ content }: Props) {
  const { heading, items } = content || {};

  if (!items?.length) return null;

  return (
    <section className="py-16 md:py-24">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              style={{ borderRadius: "var(--radius)" }}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-5 h-5 fill-current" style={{ color: "var(--secondary)" }} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {item.description && <p className="text-gray-600 mb-4 italic">"{item.description}"</p>}
              {item.title && <p className="font-semibold text-gray-900">{item.title}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
