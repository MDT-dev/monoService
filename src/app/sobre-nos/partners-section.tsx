"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { partners } from "@/data/partners";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PartnersSection() {
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-50 rounded-bl-full opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-green-50 rounded-tr-full opacity-60" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-green-300/10 rounded-full font-semibold text-green-700 text-sm font-medium mb-4">
              Colaborações Estratégicas
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nossos <span className="text-green-500">Parceiros</span> de
              Excelência
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Trabalhamos com as melhores empresas do mercado para oferecer
              soluções integradas e de alta qualidade.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          ></motion.div>
        </div>
        {/* Partners Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          layout
        >
          <AnimatePresence>
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                layout
                className="relative"
                onMouseEnter={() => setHoveredPartner(index)}
                onMouseLeave={() => setHoveredPartner(null)}
              >
                <motion.div
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 p-6 h-full flex flex-col items-center justify-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-24 flex items-center justify-center">
                    <Image
                      src={partner.image || "/placeholder.svg"}
                      alt={partner.alt}
                      width={120}
                      height={60}
                      className={cn(
                        "max-h-16 w-auto object-contain transition-all duration-500",
                        hoveredPartner === index ? "" : "grayscale",
                      )}
                    />
                  </div>

                 
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="mailto:info@mundosaudavel.ao"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1F8A70] to-green-600 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <span>Torne-se Nosso Parceiro</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}