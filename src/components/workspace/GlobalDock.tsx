"use client";

import React from "react";
import { useWorkspaceStore, WorkspaceApp } from "@/store/workspace.store";
import AppIcon from "@/components/ui/AppIcon";

interface DockItem {
  app: WorkspaceApp;
  label: string;
}

export default function GlobalDock() {
  const { activeApp, openApp } = useWorkspaceStore();

  const dockItems: DockItem[] = [
    { app: "home", label: "工作台主页" },
    { app: "resume", label: "在线简历" },
    { app: "projects", label: "精选项目" },
    { app: "thinking", label: "思维与研究" },
    { app: "lab", label: "实验室" },
    { app: "contact", label: "联系方式" },
  ];

  // Mobile Core Navigation (only show 5 core apps on small screens)
  const mobileCoreApps: WorkspaceApp[] = ["home", "resume", "projects", "thinking", "contact"];
  const mobileItems = dockItems.filter((item) => mobileCoreApps.includes(item.app));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[90vw] select-none print:hidden">
      {/* Desktop Dock (visible on sm screens and up) */}
      <div className="hidden sm:flex items-center gap-1.5 px-4 py-3 rounded-full border border-white/5 bg-[#070809]/45 backdrop-blur-md shadow-2xl relative">
        {dockItems.map((item) => {
          const isActive = activeApp === item.app;
          return (
            <button
              key={item.app}
              onClick={() => openApp(item.app)}
              className="group relative p-3.5 rounded-full text-text-muted hover:text-[#ece7df] hover:bg-white/[0.03] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent-sage/50 cursor-pointer"
              aria-label={item.label}
            >
              {/* Icon */}
              <AppIcon
                name={item.app}
                className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-accent-sage scale-105 stroke-[2]" : ""}`}
              />

              {/* Tooltip Label */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1 rounded-md bg-[#0c0d0e]/90 border border-white/5 text-[9px] tracking-wider text-[#ece7df] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                {item.label}
              </div>

              {/* Active Indicator dot */}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-sage" />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Bottom Dock (visible on xs screens) */}
      <div className="flex sm:hidden items-center gap-2 px-3 py-2.5 rounded-full border border-white/5 bg-[#070809]/65 backdrop-blur-md shadow-xl">
        {mobileItems.map((item) => {
          const isActive = activeApp === item.app;
          return (
            <button
              key={item.app}
              onClick={() => openApp(item.app)}
              className="relative p-3 rounded-full text-text-muted hover:text-[#ece7df] focus:outline-none cursor-pointer"
              aria-label={item.label}
            >
              <AppIcon
                name={item.app}
                className={`w-4.5 h-4.5 ${isActive ? "text-accent-sage stroke-[2]" : ""}`}
              />
              {isActive && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0.75 h-0.75 rounded-full bg-accent-sage" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
