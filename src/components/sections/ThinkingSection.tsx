"use client";

import React from "react";
import { motion } from "framer-motion";
import { thinking } from "@/content/site.config";
import QuoteBlock from "@/components/ui/QuoteBlock";
import { useWorkspaceStore } from "@/store/workspace.store";

export default function ThinkingSection() {
  const { openApp } = useWorkspaceStore();
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="thinking" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      {/* Quote Block */}
      <QuoteBlock quote={thinking.quote} />

      {/* Section Header with Workspace Entrance */}
      <div className="mt-12 sm:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="mb-0">
          <span className="text-[10px] font-semibold tracking-[0.22em] text-accent-sage uppercase block mb-3">
            PHILOSOPHY & METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#ece7df] leading-[1.15]">
            {thinking.title}
          </h2>
        </div>
        
        <button
          onClick={() => openApp("thinking")}
          className="self-start md:self-auto px-4 py-2 rounded-full border border-accent-sage/30 bg-accent-sage/5 text-[10px] tracking-widest text-accent-sage hover:bg-accent-sage hover:text-[#070809] hover:border-accent-sage transition-all duration-300 font-semibold uppercase flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(142,160,147,0.05)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-sage opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-sage"></span>
          </span>
          进入方法论控制台 / Open in Workspace
        </button>
      </div>

      {/* Philosophies Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
      >
        {thinking.philosophies.map((phil, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="glass-card p-8 rounded-[30px] flex flex-col justify-start text-left"
          >
            <span className="text-[10px] text-accent-sage tracking-wider font-semibold uppercase mb-4">
              0{index + 1} / METHOD
            </span>
            <h3 className="text-xl font-semibold text-[#ece7df] mb-4">
              {phil.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed font-normal">
              {phil.content}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
