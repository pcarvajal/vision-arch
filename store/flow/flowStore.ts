import { TArtifactType } from '@/index';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  type ReactFlowInstance,
} from '@xyflow/react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppNode = Node;

export interface IFlowParams {
  id?: string | null;
  year?: number;
  type: TArtifactType;
}

export interface IFlowState {
  nodes: AppNode[];
  edges: Edge[];
  reactFlowInstance: ReactFlowInstance | null;
  params: IFlowParams | null;
}

export interface IFlowActions {
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNode: (id: string, data: Record<string, any>) => void;
  removeNode: (id: string) => void;
  setReactFLowInstance: (instance: ReactFlowInstance) => void;
  setParams: (params: IFlowParams) => void;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  clearPersistedStore: () => void;
}

export interface IFlowStore extends IFlowState, IFlowActions {}

const useFlowStore = create(
  persist<IFlowStore>(
    (set, get) => ({
      nodes: [],
      edges: [],
      params: null,
      nodeTypes: {},
      edgeTypes: {},
      reactFlowInstance: null,
      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
      setReactFLowInstance: (instance) => set({ reactFlowInstance: instance }),
      setParams: (params) => set({ params }),
      updateNode(id, data) {
        set({
          nodes: get().nodes.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, ...data } }
              : node,
          ),
        });
      },
      removeNode(id) {
        set({ nodes: get().nodes.filter((node) => node.id !== id) });
      },
      onNodesChange: (changes) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) });
      },
      onEdgesChange: (changes) => {
        set({ edges: applyEdgeChanges(changes, get().edges) });
      },
      onConnect: (connection) => {
        set({ edges: addEdge(connection, get().edges) });
      },
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
