import { create } from "zustand";

export type ExperienceMode = "arrival" | "workspace";

export type WorkspaceApp =
  | "home"
  | "projects"
  | "lab"
  | "thinking"
  | "resume"
  | "contact";

export interface NavigationEntry {
  app: WorkspaceApp;
  itemId?: string;
  timestamp: number;
}

export interface WorkspaceState {
  mode: ExperienceMode;
  activeApp: WorkspaceApp;
  activeItemId?: string;
  commandPaletteOpen: boolean;
  searchQuery: string;
  navigationHistory: NavigationEntry[];
  portfolioMode: "ai" | "general";
  
  // Actions
  setMode: (mode: ExperienceMode) => void;
  setPortfolioMode: (mode: "ai" | "general") => void;
  openApp: (app: WorkspaceApp, itemId?: string, skipHistory?: boolean) => void;
  closeItem: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  goBack: () => void;
  reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  mode: "arrival",
  portfolioMode: "ai",
  activeApp: "home",
  activeItemId: undefined,
  commandPaletteOpen: false,
  searchQuery: "",
  navigationHistory: [],

  setMode: (mode) => set({ mode }),
  setPortfolioMode: (portfolioMode) => set({ portfolioMode }),
  
  openApp: (app, itemId, skipHistory = false) => {
    const { activeApp, activeItemId, navigationHistory } = get();
    
    // Add current view to history if we are changing view
    const updatedHistory = [...navigationHistory];
    if (!skipHistory && (activeApp !== app || activeItemId !== itemId)) {
      // Limit history to last 20 entries
      if (updatedHistory.length >= 20) {
        updatedHistory.shift();
      }
      updatedHistory.push({
        app: activeApp,
        itemId: activeItemId,
        timestamp: Date.now(),
      });
    }

    set({
      mode: "workspace",
      activeApp: app,
      activeItemId: itemId,
      navigationHistory: updatedHistory,
    });
  },

  closeItem: () => {
    set({ activeItemId: undefined });
  },

  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),

  goBack: () => {
    const { navigationHistory } = get();
    if (navigationHistory.length === 0) {
      // Default fallback
      set({ activeApp: "home", activeItemId: undefined });
      return;
    }

    const updatedHistory = [...navigationHistory];
    const prevEntry = updatedHistory.pop();
    
    if (prevEntry) {
      set({
        activeApp: prevEntry.app,
        activeItemId: prevEntry.itemId,
        navigationHistory: updatedHistory,
      });
    }
  },

  reset: () => set({
    mode: "arrival",
    activeApp: "home",
    activeItemId: undefined,
    commandPaletteOpen: false,
    searchQuery: "",
    navigationHistory: [],
  }),
}));
