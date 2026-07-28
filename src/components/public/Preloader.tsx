"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-[#0e1311] flex flex-col items-center justify-center text-white"
        >
          <div className="text-center relative max-w-md px-6">
            {/* Animated Logo */}
            <motion.h1
              initial={{ letterSpacing: "0.1em", opacity: 0, scale: 0.95 }}
              animate={{ 
                letterSpacing: "0.25em", 
                opacity: 1, 
                scale: 1, 
                transition: { duration: 1.2, ease: "easeOut" } 
              }}
              className="text-4xl md:text-5xl font-bold uppercase tracking-[0.25em] font-serif text-[#d4af37] mb-4"
            >
              Sephoraspa
            </motion.h1>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%", transition: { delay: 0.5, duration: 1.2, ease: "easeInOut" } }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent w-48 mx-auto mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0, transition: { delay: 1, duration: 0.6 } }}
              className="text-xs tracking-[0.4em] uppercase text-zinc-400 font-light"
            >
              Wellness & Sanctuary
            </motion.p>
          </div>

          {/* Spinner element */}
          <div className="absolute bottom-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-6 h-6 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
