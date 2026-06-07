"use client";

import React, { useState, useRef, useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspace.store";
import AppIcon from "@/components/ui/AppIcon";

interface WorkspacePanelProps {
  children: React.ReactNode;
}

export default function WorkspacePanel({ children }: WorkspacePanelProps) {
  const { activeItemId, goBack, closeItem, reset } = useWorkspaceStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  const handleReset = () => {
    closeItem();
    setMenuOpen(false);
  };

  return (
    <div className="w-full max-w-6xl px-4 sm:px-8 mx-auto print:p-0 print:max-w-none">
      {/* Utility Bar (Clean, borderless row for actions) */}
      <div className="h-10 flex items-center justify-between mb-4 select-none print:hidden">
        {/* Left: Go Back button */}
        <div className="flex items-center gap-3">
          {activeItemId && (
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-sage transition-colors duration-300 focus:outline-none cursor-pointer"
            >
              <AppIcon name="back" className="w-3.5 h-3.5" />
              <span>返回 / Back</span>
            </button>
          )}
        </div>

        {/* Right: Options Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1 p-2 rounded-full hover:bg-white/5 text-text-muted hover:text-[#ece7df] transition-all duration-200 cursor-pointer focus:outline-none"
            aria-label="更多操作 / More actions"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
          </button>
          
          {/* Dropdown Menu */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-[#0c0d0e]/95 backdrop-blur-md shadow-2xl p-1.5 z-50 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {/* Conditional Go Back to List (if inside item details) */}
              {activeItemId && (
                <button
                  onClick={handleReset}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs rounded-lg hover:bg-white/[0.04] text-text-secondary hover:text-[#ece7df] transition-colors duration-200 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span>返回列表 / Back to List</span>
                </button>
              )}

              {/* Exit Workspace */}
              <button
                onClick={() => {
                  reset();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs rounded-lg hover:bg-white/[0.04] text-text-secondary hover:text-accent-sage transition-colors duration-200 cursor-pointer border-t border-white/5 mt-0.5 pt-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                <span>退出控制台 / Exit OS</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area (Height-adaptive, browser scrollable) */}
      <div className="w-full print:p-0">
        {children}
      </div>
    </div>
  );
}
