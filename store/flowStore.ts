import { FlowData } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FlowStoreState {
  flow: FlowData | null;
  setFlow: (flow: FlowData) => void;
  updateFlow: (flow: FlowData) => void;
  deleteFlow: () => void;
  clearPersistedFlowStore: () => void;
}

const useFlowStore = create(
  persist<FlowStoreState>(
    (set) => ({
      flow: null,
      setFlow: (flow) => set({ flow }),
      updateFlow: (flow) => set((state) => ({ ...state, flow })),
      deleteFlow: () => set({ flow: null }),
      clearPersistedFlowStore: () => {
        useFlowStore.persist.clearStorage();
        set({ flow: null });
      },
    }),
    { name: 'flow-store' },
  ),
);

export default useFlowStore;
