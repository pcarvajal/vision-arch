import { Edge, Node, ReactFlowInstance, Viewport } from '@xyflow/react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TArtifactType } from '..';

export interface IFlowParams {
  id?: string | null;
  year: number;
  type: TArtifactType;
}

export interface IFlowState {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  params: IFlowParams | null;
  reactFlowInstance?: ReactFlowInstance | null;
}

export interface IFlowActions {
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setViewport: (viewport: Viewport) => void;
  setParams: (params: IFlowParams) => void;
  setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => void;
  clearPersistedStore: () => void;
}

export interface IFlowStore extends IFlowState, IFlowActions {}

const useFlowStore = create(
  persist<IFlowStore>(
    (set) => ({
      nodes: [],
      edges: [],
      viewport: {
        zoom: 1,
        x: 0,
        y: 0,
      },
      params: null,
      reactFlowInstance: null,
      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
      setViewport: (viewport) => set({ viewport }),
      setParams: (params) => set({ params }),
      setReactFlowInstance: (reactFlowInstance) => set({ reactFlowInstance }),
      clearPersistedStore: () =>
        set({
          nodes: [],
          edges: [],
          params: null,
          reactFlowInstance: null,
        }),
    }),
    { name: 'flow-store' },
  ),
);

export default useFlowStore;
