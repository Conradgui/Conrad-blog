"use client";

import React from "react";
import { motion } from "framer-motion";
import { writing } from "@/content/site.config";
import SectionTitle from "@/components/ui/SectionTitle";
import { useWorkspaceStore } from "@/store/workspace.store";

export default function WritingSection() {
  const { openApp } = useWorkspaceStore();

  return (
    <section id="writing" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      <SectionTitle eyebrow="RESEARCH & WRITING" title={writing.title} />

      <div className="flex flex-col gap-6 mt-8 max-w-4xl">
        {writing.notes.map((note, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => openApp("thinking", note.id)}
            className="group w-full relative glass-card p-8 rounded-[24px] flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-accent-sage/35 text-left cursor-pointer transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent-sage/30"
          >
            <div className="flex-1">
              <span className="text-[10px] text-text-muted tracking-wider block mb-2">
                {note.date}
              </span>
              <h3 className="text-lg sm:text-xl font-medium text-[#ece7df] group-hover:text-accent-sage transition-colors duration-300">
                {note.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-light mt-3">
                {note.summary}
              </p>
            </div>

            <div className="self-end md:self-center">
              <span className="text-[11px] font-medium tracking-widest uppercase text-accent-sage/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                READ / 阅读 <span>→</span>
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
