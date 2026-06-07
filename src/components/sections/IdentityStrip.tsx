"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site.config";

export default function IdentityStrip() {
  return (
    <div className="w-full border-y border-white/5 bg-[#070809]/40 backdrop-blur-xs relative z-10 py-6 px-6 sm:px-12 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Label */}
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-accent-sage/80">
          Currently Focused On / 当前关注
        </span>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-x-8">
          {siteConfig.focusAreas.map((area, index) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5"
            >
              {index > 0 && (
                <span className="hidden md:inline text-[8px] text-accent-sage/40">•</span>
              )}
              <span className="text-xs sm:text-sm text-text-secondary font-medium tracking-wide">
                {area}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
