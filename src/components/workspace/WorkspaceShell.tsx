"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore } from "@/store/workspace.store";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import GlobalDock from "@/components/workspace/GlobalDock";
import CommandPalette from "@/components/workspace/CommandPalette";
import WorkspacePanel from "@/components/workspace/WorkspacePanel";

// Content Apps imports
import HomeApp from "@/components/apps/HomeApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import LabApp from "@/components/apps/LabApp";
import ThinkingApp from "@/components/apps/ThinkingApp";
import ResumeApp from "@/components/apps/ResumeApp";
import ContactApp from "@/components/apps/ContactApp";

export default function WorkspaceShell() {
  const { activeApp, activeItemId, commandPaletteOpen, setCommandPaletteOpen } = useWorkspaceStore();

  // Reset scroll position to top when changing applications or detail items
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeApp, activeItemId]);

  // Listen to keyboard shortcuts for command palette (⌘K / Ctrl+K / /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "/") {
        const activeEl = document.activeElement;
        const isInput = activeEl?.tagName === "INPUT" || activeEl?.tagName === "TEXTAREA";
        if (!isInput) {
          e.preventDefault();
          setCommandPaletteOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Render the selected Workspace application
  const renderApp = () => {
    switch (activeApp) {
      case "home":
        return <HomeApp />;
      case "projects":
        return <ProjectsApp />;
      case "lab":
        return <LabApp />;
      case "thinking":
        return <ThinkingApp />;
      case "resume":
        return <ResumeApp />;
      case "contact":
        return <ContactApp />;
      default:
        return <HomeApp />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen flex flex-col bg-bg-primary text-text-primary z-10 selection:bg-accent-sage/35 selection:text-white print:bg-white print:text-black print:min-h-0"
    >
      {/* Workspace top navigation header */}
      <WorkspaceHeader />

      {/* Controlled main content area */}
      <main className="flex-grow flex flex-col justify-start items-center w-full pt-16 pb-32 print:pt-0 print:pb-0">
        <WorkspacePanel>{renderApp()}</WorkspacePanel>
      </main>

      {/* Global OS dock */}
      <GlobalDock />

      {/* Command Palette search modal */}
      <AnimatePresence>
        {commandPaletteOpen && <CommandPalette />}
      </AnimatePresence>
    </motion.div>
  );
}
