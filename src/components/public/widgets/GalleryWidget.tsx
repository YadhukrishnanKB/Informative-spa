"use client";

import { motion } from "framer-motion";

interface Props {
  content: any;
}

export default function GalleryWidget({ content }: Props) {
  const { heading, description, items } = content || {};

  if (!items?.length) return null;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {heading && (
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4" style={{ color: "var(--primary)" }}>
              {heading}
            </h2>
          )}
          {description && <p className="text-gray-600 text-lg leading-relaxed">{description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group cursor-pointer border"
            >
              <img
                src={item.image}
                alt={item.title || "Spa facility"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span className="text-xs uppercase text-[#d4a373] tracking-widest font-semibold block mb-1">
                    Serenity View
                  </span>
                  <h4 className="text-white text-lg font-bold font-serif">{item.title || "Treatment"}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
