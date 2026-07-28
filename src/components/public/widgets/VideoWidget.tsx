"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  content: any;
}

export default function VideoWidget({ content }: Props) {
  const { heading, description } = content || {};
  const [isOpen, setIsOpen] = useState(false);

  if (!content?.videoUrl && !content?.coverImage && !heading && !description) return null;

  const coverImage = content?.coverImage || content?.image;
  const videoUrl = content?.videoUrl || content?.buttonLink;

  const fallbackCover = coverImage;
  const embedUrl = videoUrl;

  return (
    <section className="py-16 md:py-24 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {heading && (
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4 text-[#d4a373]">
              {heading}
            </h2>
          )}
          {description && <p className="text-zinc-400 text-lg leading-relaxed">{description}</p>}
        </div>

        {/* Video Thumbnail / Trigger */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={fallbackCover}
            alt="Video cover"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
            {/* Animated Play Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 bg-[#d4a373] text-white rounded-full flex items-center justify-center shadow-lg relative"
            >
              <span className="absolute inset-0 rounded-full bg-[#d4a373] animate-ping opacity-30"></span>
              <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Video Lightbox Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-10 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <iframe
                  src={embedUrl}
                  title="Spa Experience Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
