"use client";

import { motion } from "framer-motion";

interface Props {
  content: any;
}

export default function ProcessWidget({ content }: Props) {
  const { heading, description, steps } = content || {};

  if (!steps?.length) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
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
            className="text-center text-gray-600 mb-16 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />
          {steps.map((step: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex items-start gap-6 md:gap-0 mb-12 md:mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:flex w-1/2 items-center justify-center">
                <div className={`max-w-sm ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--primary)" }}>
                    {step.title || `Step ${i + 1}`}
                  </h3>
                  {step.description && <p className="text-gray-600">{step.description}</p>}
                </div>
              </div>
              <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full shadow-lg border-2 border-white"
                style={{ backgroundColor: "var(--primary)" }}
              >
                {step.icon ? (
                  <span className="text-2xl">{step.icon}</span>
                ) : (
                  <span className="text-white font-bold text-lg">{i + 1}</span>
                )}
              </div>
              <div className="md:hidden flex-1 pt-3">
                <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--primary)" }}>
                  {step.title || `Step ${i + 1}`}
                </h3>
                {step.description && <p className="text-gray-600 text-sm">{step.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
