"use client";

import React from "react";
import { motion } from "framer-motion";

type QuoteBlockProps = {
  quote: string;
};

export default function QuoteBlock({ quote }: QuoteBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1100px] mx-auto text-left py-16 sm:py-24"
    >
      <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#e5dfd5] leading-[1.45] font-sans border-l-2 border-accent-sage/30 pl-6 sm:pl-10">
        {quote}
      </blockquote>
    </motion.div>
  );
}
