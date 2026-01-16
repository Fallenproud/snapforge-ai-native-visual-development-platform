import { create } from 'zustand';
export type ArtifactStatus = 'stable' | 'forging' | 'pending';
export type ArtifactType = 'ui' | 'logic' | 'component' | 'data';
export interface Artifact {
  id: string;
  name: string;
  type: ArtifactType;
  status: ArtifactStatus;
}
export interface Log {
  id: string;
  timestamp: number;
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;
}
export type TemplateType = 'landing' | 'auth' | 'dashboard' | 'none';
interface WorkspaceState {
  artifacts: Artifact[];
  logs: Log[];
  activeTemplate: TemplateType;
  isForging: boolean;
  selectedArtifactId: string | null;
  artifactContent: Record<string, string>;
  // Actions
  addArtifact: (artifact: Omit<Artifact, 'id'>) => void;
  removeArtifact: (id: string) => void;
  updateArtifactName: (id: string, name: string) => void;
  updateArtifactStatus: (id: string, status: ArtifactStatus) => void;
  updateArtifactContent: (id: string, code: string) => void;
  selectArtifact: (id: string | null) => void;
  addLog: (level: Log['level'], message: string) => void;
  setTemplate: (template: TemplateType) => void;
  setIsForging: (status: boolean) => void;
  clearWorkspace: () => void;
}
export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  artifacts: [],
  logs: [
    { id: 'initial', timestamp: Date.now(), level: 'info', message: 'Forge system initialized. Waiting for instructions...' }
  ],
  activeTemplate: 'none',
  isForging: false,
  selectedArtifactId: null,
  artifactContent: {},
  addArtifact: (artifact) => set((state) => {
    const id = crypto.randomUUID();
    const newArtifact = { ...artifact, id };
    const shouldSelect = state.selectedArtifactId === null;
    return {
      artifacts: [...state.artifacts, newArtifact],
      selectedArtifactId: shouldSelect ? id : state.selectedArtifactId
    };
  }),
  removeArtifact: (id) => set((state) => {
    const newArtifacts = state.artifacts.filter((a) => a.id !== id);
    const newContent = { ...state.artifactContent };
    delete newContent[id];
    return {
      artifacts: newArtifacts,
      artifactContent: newContent,
      selectedArtifactId: state.selectedArtifactId === id ? (newArtifacts[0]?.id || null) : state.selectedArtifactId
    };
  }),
  updateArtifactName: (id, name) => set((state) => ({
    artifacts: state.artifacts.map((a) => a.id === id ? { ...a, name } : a)
  })),
  updateArtifactStatus: (id, status) => set((state) => ({
    artifacts: state.artifacts.map((a) => a.id === id ? { ...a, status } : a)
  })),
  updateArtifactContent: (id, code) => set((state) => ({
    artifactContent: { ...state.artifactContent, [id]: code }
  })),
  selectArtifact: (id) => set({ selectedArtifactId: id }),
  addLog: (level, message) => set((state) => ({
    logs: [...state.logs, { id: crypto.randomUUID(), timestamp: Date.now(), level, message }]
  })),
  setTemplate: (template) => set({ activeTemplate: template }),
  setIsForging: (status) => set({ isForging: status }),
  clearWorkspace: () => set({
    artifacts: [],
    logs: [{ id: 're-init', timestamp: Date.now(), level: 'info', message: 'Forge context cleared. System stand-by.' }],
    activeTemplate: 'none',
    isForging: false,
    selectedArtifactId: null,
    artifactContent: {}
  }),
}));