import { getProjectWithRelations, ProjectWithRelations } from "@/lib/actions/viewAction";
import { create } from "zustand";
// Adjust path to your server action

interface ProjectModalState {
  isOpen: boolean;
  isLoading: boolean;
  activeProject: ProjectWithRelations | null;
  activeMediaUrl: string | null; // For light-box full-screen view
  error: string | null;
  
  openProject: (slug: string) => Promise<void>;
  closeProject: () => void;
  openMediaModal: (url: string) => void;
  closeMediaModal: () => void;
}

export const useProjectModalStore = create<ProjectModalState>((set) => ({
  isOpen: false,
  isLoading: false,
  activeProject: null,
  activeMediaUrl: null,
  error: null,

  openProject: async (slug: string) => {
    set({ isOpen: true, isLoading: true, error: null });
    
    const response = await getProjectWithRelations(slug);

    if (response.success && response.data) {
      set({ activeProject: response.data, isLoading: false });
    } else {
      set({ error: response.error || "Failed to load project", isLoading: false });
    }
  },

  closeProject: () =>
    set({
      isOpen: false,
      activeProject: null,
      activeMediaUrl: null,
      error: null,
    }),

  openMediaModal: (url: string) => set({ activeMediaUrl: url }),
  closeMediaModal: () => set({ activeMediaUrl: null }),
}));