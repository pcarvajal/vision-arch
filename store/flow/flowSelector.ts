import { IFlowStore } from './flowStore';

export const flowSelector = (state: IFlowStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setReactFLowInstance: state.setReactFLowInstance,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  params: state.params,
  clearPersistedStore: state.clearPersistedStore,
  reactFlowInstance: state.reactFlowInstance,
  setParams: state.setParams,
});
