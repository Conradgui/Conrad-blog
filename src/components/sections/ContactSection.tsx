"use client";

import React from "react";
import { motion } from "framer-motion";
import { contact } from "@/content/site.config";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassButton from "@/components/ui/GlassButton";
import { useWorkspaceStore } from "@/store/workspace.store";

export default function ContactSection() {
  const { openApp } = useWorkspaceStore();

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto relative z-10 border-t border-white/5 text-left">
      <SectionTitle eyebrow="GET IN TOUCH" title={contact.title} />

      <div className="max-w-3xl mt-8">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-text-secondary leading-relaxed font-light"
        >
          {contact.description}
        </motion.p>

        {/* Contact and Workspace OS Entrance (Resume / Profile) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-6"
        >
          <div className="flex flex-wrap items-center gap-4">
            <GlassButton href={`mailto:${contact.email}`} variant="primary">
              发送邮件 / Email Me
            </GlassButton>
            
            <GlassButton onClick={() => openApp("resume")} variant="secondary">
              查看个人简历 / View Resume
            </GlassButton>
            
            <GlassButton onClick={() => openApp("resume", "about")} variant="secondary">
              浏览详细履历 / View Profile
            </GlassButton>
          </div>

          <div className="text-xs text-text-muted">
            直接联系邮箱：<span className="select-all font-mono text-accent-sage">{contact.email}</span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-8 border-t border-white/5 flex items-center gap-8"
        >
          {contact.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] sm:text-xs tracking-widest uppercase font-semibold text-text-muted hover:text-accent-sage transition-colors duration-300"
            >
              {social.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
