"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/content/site.config";
import GlassButton from "@/components/ui/GlassButton";
import OrbitLayer from "@/components/motion/OrbitLayer";
export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="hero min-h-[120vh] flex items-center justify-start py-20 px-6 sm:px-12 md:px-24 overflow-hidden relative"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[rgba(142,160,147,0.03)] blur-[100px] pointer-events-none -z-1" />

      {/* Orbit Background Layer */}
      <OrbitLayer />

      {/* Hero inner content */}
      <motion.div
        style={{ y: yParallax }}
        className="hero-inner max-w-4xl relative z-10 text-left mt-16 sm:mt-24"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-accent-sage mb-6 uppercase"
        >
          {siteConfig.hero.eyebrow}
        </motion.div>

        {/* Heading with compressed leading and tight tracking */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-[-0.05em] text-[#ece7df] leading-[1.05]"
        >
          {siteConfig.hero.titleLines.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < siteConfig.hero.titleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </motion.h1>

        {/* Subcopy / description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl font-light"
        >
          {siteConfig.hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <GlassButton onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })} variant="primary">
            查看项目
          </GlassButton>
          <GlassButton onClick={() => document.getElementById("thinking")?.scrollIntoView({ behavior: "smooth" })} variant="secondary">
            阅读方法论
          </GlassButton>
          <GlassButton onClick={() => document.getElementById("writing")?.scrollIntoView({ behavior: "smooth" })} variant="secondary">
            研究与思考
          </GlassButton>
          <GlassButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} variant="secondary">
            联系我
          </GlassButton>
        </motion.div>
      </motion.div>

      {/* Scroll prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute left-6 sm:left-12 md:left-24 bottom-12 text-[10px] sm:text-xs tracking-[0.2em] text-text-muted uppercase font-medium"
      >
        SCROLL / 向下探索
      </motion.div>
    </section>
  );
}
