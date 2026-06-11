"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useWorkspaceStore, WorkspaceApp } from "@/store/workspace.store";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import ParticleField from "@/components/motion/ParticleField";
import HeroSection from "@/components/sections/HeroSection";
import IdentityStrip from "@/components/sections/IdentityStrip";
import WorksSection from "@/components/sections/WorksSection";
import ThinkingSection from "@/components/sections/ThinkingSection";
import WritingSection from "@/components/sections/WritingSection";
import ContactSection from "@/components/sections/ContactSection";
import WorkspaceShell from "@/components/workspace/WorkspaceShell";

interface WorkspaceRootProps {
  initialRoute?: string[];
}

export default function WorkspaceRoot({ initialRoute: _initialRoute }: WorkspaceRootProps) {
  const pathname = usePathname();
  const { mode, activeApp, activeItemId, openApp, reset, setPortfolioMode } = useWorkspaceStore();

  // 0. Initialize portfolioMode from URL parameter (e.g. ?mode=general or ?mode=pm)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get("mode");
      if (modeParam === "general" || modeParam === "pm") {
        setPortfolioMode("general");
      }
    }
  }, [setPortfolioMode]);

  // 1. Sync URL path to Zustand workspace store
  useEffect(() => {
    if (!pathname) return;

    // Use getState() to avoid listing store values as effect dependencies
    const state = useWorkspaceStore.getState();

    if (pathname === "/") {
      if (state.mode !== "arrival") {
        reset();
      }
    } else if (pathname.startsWith("/workspace")) {
      const segments = pathname.split("/").filter(Boolean); // e.g., ["workspace", "projects", "fitcheck"]
      let app = (segments[1] || "home") as WorkspaceApp;
      const itemId = segments[2];

      // Redirection logic for deprecated/merged apps
      if (app as string === "profile") {
        app = "resume";
      } else if (app as string === "cases") {
        app = "projects";
      } else if (app as string === "notes") {
        app = "thinking";
      }

      if (state.mode !== "workspace" || state.activeApp !== app || state.activeItemId !== itemId) {
        // Skip history to prevent circular loops
        openApp(app, itemId, true);
      }
    }
  }, [pathname, openApp, reset]);

  // 2. Sync Zustand workspace store back to URL path without full-page remount
  useEffect(() => {
    let targetPath = "/";
    if (mode === "workspace") {
      targetPath = `/workspace/${activeApp}`;
      if (activeItemId) {
        targetPath += `/${activeItemId}`;
      }
    }

    if (typeof window !== "undefined" && window.location.pathname !== targetPath) {
      window.history.pushState(null, "", targetPath);
    }
  }, [mode, activeApp, activeItemId]);

  // 3. Scroll entry effect removed so homepage scrolls normally

  // 4. Reset scroll to top when returning to Arrival mode
  useEffect(() => {
    if (mode === "arrival") {
      window.scrollTo(0, 0);
    }
  }, [mode]);

  // 5. Handle URL hashes (e.g., #works, #thinking) on initial load and hash change
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const hashAppMap: Record<string, WorkspaceApp> = {
        "#works": "projects",
        "#thinking": "thinking",
        "#contact": "contact",
        "#home": "home",
      };

      const targetApp = hashAppMap[hash];
      if (targetApp) {
        openApp(targetApp);
      }
    };

    // Run once on mount
    handleHash();

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [openApp]);

  // 6. Listen to popstate (browser back/forward) to sync URL back to Zustand
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/") {
        const state = useWorkspaceStore.getState();
        if (state.mode !== "arrival") {
          reset();
        }
      } else if (path.startsWith("/workspace")) {
        const segments = path.split("/").filter(Boolean);
        let app = (segments[1] || "home") as WorkspaceApp;
        const itemId = segments[2];
        
        // Redirection logic for deprecated/merged apps
        if (app as string === "profile") {
          app = "resume";
        } else if (app as string === "cases") {
          app = "projects";
        } else if (app as string === "notes") {
          app = "thinking";
        }
        
        const state = useWorkspaceStore.getState();
        if (state.mode !== "workspace" || state.activeApp !== app || state.activeItemId !== itemId) {
          openApp(app, itemId, true);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [openApp, reset]);

  return (
    <SmoothScrollProvider>
      {/* Background Interactive Particles */}
      <ParticleField />

      {mode === "arrival" ? (
        <div className="relative min-h-screen flex flex-col z-10 selection:bg-accent-sage/35 selection:text-white transition-opacity duration-700 ease-in-out">
          <Navbar />
          <main className="flex-grow">
            <HeroSection />
            <IdentityStrip />
            <WorksSection />
            <ThinkingSection />
            <WritingSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      ) : (
        <WorkspaceShell />
      )}
    </SmoothScrollProvider>
  );
}
