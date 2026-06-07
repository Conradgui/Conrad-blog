"use client";

import React from "react";
import { useWorkspaceStore } from "@/store/workspace.store";
import AppIcon from "@/components/ui/AppIcon";

export default function WorkspaceHeader() {
  const { activeApp, activeItemId, reset, setCommandPaletteOpen } = useWorkspaceStore();

  // App names localized for breadcrumbs
  const appLabels: Record<string, string> = {
    home: "工作台主页",
    projects: "精选项目",
    lab: "实验室",
    thinking: "思维与研究",
    resume: "在线简历",
    contact: "联系方式",
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-white/5 bg-[#070809]/40 backdrop-blur-md flex items-center justify-between px-6 select-none print:hidden">
      {/* Brand logo / Exit trigger */}
      <button
        onClick={reset}
        className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
      >
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#ece7df] group-hover:text-accent-sage transition-colors duration-300">
          CLANCY SPACE
        </span>
        <span className="text-[9px] text-text-muted group-hover:translate-x-0.5 transition-transform duration-300">
          (退出 / Exit)
        </span>
      </button>

      {/* Center path indicator (Breadcrumbs) */}
      <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-widest text-text-muted font-medium uppercase">
        <span>WORKSPACE</span>
        <span>/</span>
        <span className="text-[#ece7df]">{appLabels[activeApp] || activeApp}</span>
        {activeItemId && (
          <>
            <span>/</span>
            <span className="text-accent-sage font-semibold">{activeItemId}</span>
          </>
        )}
      </div>

      {/* Right Search Action */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[10px] text-text-muted tracking-wider hover:border-accent-sage/40 hover:text-[#ece7df] transition-all duration-300 focus:outline-none cursor-pointer"
      >
        <AppIcon name="search" className="w-3 h-3" />
        <span className="hidden md:inline">搜索与指令</span>
        <kbd className="bg-white/5 px-1.5 py-0.5 rounded-md text-[8px] font-mono leading-none border border-white/10">
          ⌘K
        </kbd>
      </button>
    </header>
  );
}
