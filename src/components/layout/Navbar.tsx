"use client";

import React from "react";
import { siteConfig } from "@/content/site.config";
import { useWorkspaceStore } from "@/store/workspace.store";

export default function Navbar() {
  const { openApp } = useWorkspaceStore();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-5 sm:py-6 glass-nav">
      {/* Brand logo/name */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#cfc7bb] uppercase">
          {siteConfig.name} / MOTION LAB
        </span>
        <span className="hidden sm:inline text-[10px] text-accent-sage tracking-wider">
          •
        </span>
        <span className="text-[9px] sm:text-[10px] text-text-muted tracking-widest uppercase font-light">
          AI · 产品 · 创意系统
        </span>
      </div>

      {/* Navigation & Launch Controls */}
      <div className="flex items-center gap-4 sm:gap-8">
        <ul className="flex items-center gap-4 sm:gap-6">
          {siteConfig.nav.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[11px] sm:text-xs tracking-wider text-text-muted hover:text-[#ece7df] transition-colors duration-300 font-medium cursor-pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

        <button
          onClick={() => openApp("home")}
          className="relative px-3 sm:px-4 py-1.5 rounded-full border border-accent-sage/35 bg-accent-sage/5 text-[9px] sm:text-[10px] tracking-widest text-accent-sage hover:bg-accent-sage hover:text-[#070809] hover:border-accent-sage transition-all duration-300 font-semibold uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(142,160,147,0.1)] active:scale-95 cursor-pointer"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-sage opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-sage"></span>
          </span>
          WORKSPACE OS
        </button>
      </div>
    </nav>
  );
}
