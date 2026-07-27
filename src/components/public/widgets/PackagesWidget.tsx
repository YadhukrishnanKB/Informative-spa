"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  content: any;
}

export default function PackagesWidget({ content }: Props) {
  const { heading, description, items } = content || {};

  const defaultItems = [
    {
      title: "Quick Rejuvenation",
      price: "$75",
      duration: "45 Mins",
      description: "Perfect for a quick reset during a busy workday.",
      features: ["Swedish Back Massage", "Herbal Tea Service", "Steam Room Access"],
      popular: false,
    },
    {
      title: "Signature Wellness",
      price: "$145",
      duration: "90 Mins",
      description: "Our most popular balanced massage and skin treatment package.",
      features: ["Hot Stone Therapy", "Aromatherapy Session", "Rejuvenating Facial", "Relaxation Lounge access"],
      popular: true,
    },
    {
      title: "Luxury Escape",
      price: "$230",
      duration: "150 Mins",
      description: "The ultimate indulgence session for complete relaxation.",
      features: ["Full Body Deep Tissue Massage", "Organic Hydrating Facial", "Foot Reflexology Treatment", "Glass of Champagne"],
      popular: false,
    },
  ];

  const packageItems = items && items.length > 0 ? items : defaultItems;

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {heading && (
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4" style={{ color: "var(--primary)" }}>
              {heading}
            </h2>
          )}
          {description && <p className="text-gray-600 text-lg leading-relaxed">{description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packageItems.map((pkg: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`bg-white rounded-3xl p-8 shadow-lg border relative flex flex-col justify-between ${
                pkg.popular ? "border-[#d4a373] ring-2 ring-[#d4a373]/20 md:-translate-y-4" : "border-gray-100"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white bg-[#d4a373] uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold font-serif text-zinc-800">{pkg.title}</h3>
                  <span className="text-sm font-semibold text-[#d4a373] bg-[#d4a373]/10 px-2.5 py-1 rounded-full">
                    {pkg.duration}
                  </span>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-zinc-900">{pkg.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{pkg.description}</p>
                <div className="border-t border-gray-100 my-6"></div>
                <ul className="space-y-3 mb-8">
                  {pkg.features && pkg.features.map((feat: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm text-zinc-700">
                      <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className={`w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 block hover:scale-105 active:scale-95 ${
                  pkg.popular
                    ? "bg-[#d4a373] text-white hover:bg-[#c29263] shadow-md shadow-[#d4a373]/20"
                    : "bg-gray-100 text-zinc-800 hover:bg-gray-200"
                }`}
              >
                Book Package
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
