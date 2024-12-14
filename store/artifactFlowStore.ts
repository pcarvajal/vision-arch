import { ArtifactType } from '@/types';
import { ReactFlowJsonObject } from '@xyflow/react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ArtifactFlowDataStore = {
  id?: string;
  data: ReactFlowJsonObject | null;
  year: number;
  type: ArtifactType;
};

export type ArtifactFlowState = {
  artifactFlow: ArtifactFlowDataStore | null;
};

export type ArtifactFlowActions = {
  setArtifactFlow: (artifactFlow: ArtifactFlowDataStore) => void;
  updateArtifactFlow: (artifactFlow: ArtifactFlowDataStore) => void;
  deleteArtifactFlow: () => void;
  clearPersistedArtifactFlowStore: () => void;
};

export type ArtifactFlowStore = ArtifactFlowState & ArtifactFlowActions;

const useArtifactFlowStore = create(
  persist<ArtifactFlowStore>(
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
