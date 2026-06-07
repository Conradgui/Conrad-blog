"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWorkspaceStore } from "@/store/workspace.store";
import AppIcon from "@/components/ui/AppIcon";

interface CommandItem {
  id: string;
  category: "app" | "project" | "action";
  label: string;
  sublabel?: string;
  icon: "home" | "projects" | "lab" | "thinking" | "resume" | "contact" | "search" | "back" | "close" | "command" | "copilot";
  action: () => void;
}

export default function CommandPalette() {
  const { openApp, reset, setCommandPaletteOpen } = useWorkspaceStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close when clicking outside of the console card
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setCommandPaletteOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [setCommandPaletteOpen]);

  // List of commands (Zustand routing actions & Mock searches)
  const commands: CommandItem[] = [
    // App navigation commands
    { id: "app-home", category: "app", label: "打开 工作台主页 (Home App)", icon: "home", action: () => openApp("home") },
    { id: "app-resume", category: "app", label: "打开 在线简历与履历 (Resume & Profile)", icon: "resume", action: () => openApp("resume") },
    { id: "app-projects", category: "app", label: "打开 精选项目与案例 (Projects & Cases)", icon: "projects", action: () => openApp("projects") },
    { id: "app-thinking", category: "app", label: "打开 思维与研究 (Thinking & Insights)", icon: "thinking", action: () => openApp("thinking") },
    { id: "app-contact", category: "app", label: "打开 联系方式 (Contact App)", icon: "contact", action: () => openApp("contact") },
    
    // Project detail commands
    { id: "proj-fitcheck", category: "project", label: "查看 FitCheck 详情", sublabel: "AR/2.5D 决策辅助产品实验", icon: "projects", action: () => openApp("projects", "fitcheck") },
    { id: "proj-zero", category: "project", label: "查看 Zero-to-One 详情", sublabel: "AI 辅助产品探索 workflow 项目", icon: "projects", action: () => openApp("projects", "zero-to-one") },
    { id: "proj-radar", category: "project", label: "查看 AI Trend Radar 详情", sublabel: "自动追踪 AI 行业热点情报系统", icon: "projects", action: () => openApp("projects", "ai-trend-radar") },

    // Action commands
    { id: "act-copy-email", category: "action", label: "复制联系邮箱", sublabel: "clancy@example.com", icon: "contact", action: () => { navigator.clipboard.writeText("clancy@example.com"); alert("邮箱已复制！"); } },
    { id: "act-exit", category: "action", label: "返回电影化入口 (Return to Arrival)", icon: "close", action: () => reset() },
  ];

  // Filter commands by query string
  const filteredCommands = commands.filter((cmd) => {
    const term = query.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(term) ||
      (cmd.sublabel && cmd.sublabel.toLowerCase().includes(term))
    );
  });

  // Reset selected item index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard events (Arrows, Enter, Esc)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setCommandPaletteOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setCommandPaletteOpen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070809]/80 backdrop-blur-xs flex items-start justify-center pt-[15vh] px-4 select-none">
      <div
        ref={containerRef}
        className="w-full max-w-xl rounded-2xl bg-[#0c0d0e] border border-white/10 shadow-2xl flex flex-col overflow-hidden max-h-[60vh] animate-fade-up"
      >
        {/* Search bar input header */}
        <div className="flex items-center gap-3 px-4 border-b border-white/5 h-14">
          <AppIcon name="search" className="w-5 h-5 text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            placeholder="键入指令或搜索项目、方法论、笔记..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-sm text-[#ece7df] placeholder-text-muted h-full"
          />
          <span className="text-[10px] text-text-muted bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md">
            ESC
          </span>
        </div>

        {/* Console command list */}
        <div data-lenis-prevent className="overflow-y-auto py-2 flex-grow max-h-[40vh]">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    setCommandPaletteOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 outline-none focus:outline-none ${isSelected ? "bg-white/[0.04] text-accent-sage" : "text-text-secondary"}`}
                >
                  <div className="flex items-center gap-3">
                    <AppIcon name={cmd.icon} className={`w-4 h-4 ${isSelected ? "text-accent-sage" : "text-text-muted"}`} />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{cmd.label}</span>
                      {cmd.sublabel && (
                        <span className="text-xs text-text-muted font-light mt-0.5">{cmd.sublabel}</span>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] text-accent-sage font-medium tracking-widest">
                      ENTER ↵
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="px-6 py-12 text-center text-sm text-text-muted">
              没有找到匹配的指令或内容
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
