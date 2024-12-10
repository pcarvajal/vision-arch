import { ArtifactFlowData } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ArtifactFlowStoreState {
  artifactFlow: ArtifactFlowData | null;
  setArtifactFlow: (artifactFlow: ArtifactFlowData) => void;
  updateArtifactFlow: (artifactFlow: ArtifactFlowData) => void;
  deleteArtifactFlow: () => void;
  clearPersistedArtifactFlowStore: () => void;
}

const useArtifactFlowStore = create(
  persist<ArtifactFlowStoreState>(
    (set) => ({
      artifactFlow: null,
      setArtifactFlow: (artifactFlow) => set({ artifactFlow }),
      updateArtifactFlow: (artifactFlow) =>
        set((state) => ({ ...state, artifactFlow })),
      deleteArtifactFlow: () => set({ artifactFlow: null }),
      clearPersistedArtifactFlowStore: () => {
        useArtifactFlowStore.persist.clearStorage();
        set({ artifactFlow: null });
      },
    }),
    { name: 'artifact-flow-store' },
  ),
);

export default useArtifactFlowStore;
