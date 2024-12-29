'use client';

import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  useReactFlow,
  type EdgeTypes,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { generateModel } from '@/actions/ai.actions';
import { getArtifactByYearProjectionAndType } from '@/actions/artifact.actions';
import Slider from '@/components/diagrams/components/Slider';
import ThinkingLoader from '@/components/shared/ThinkingLoader';
import { IArtifactConfig } from '@/index';
import useFlowStore, { IFlowStore } from '@/store/flowStore';
import useUserStore from '@/store/userStore';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

export interface ArtifactFlowProps {
  config: IArtifactConfig;
  types: {
    nodes?: NodeTypes;
    edges?: EdgeTypes;
  };
  slider?: boolean;
  vision?: boolean;
}

const selector = (state: IFlowStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setReactFLowInstance: state.setReactFLowInstance,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  edgeTypes: state.edgeTypes,
  nodeTypes: state.nodeTypes,
  params: state.params,
  clearPersistedStore: state.clearPersistedStore,
  reactFlowInstance: state.reactFlowInstance,
  setEdgeTypes: state.setEdgeTypes,
  setNodeTypes: state.setNodeTypes,
  setParams: state.setParams,
});

export default function ArtifactFlow({
  config,
  types,
  slider = true,
  vision = false,
}: ArtifactFlowProps) {
  const instance = useReactFlow();
  const { company, loading, setLoading } = useUserStore();
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    setReactFLowInstance,
    onNodesChange,
    onEdgesChange,
    onConnect,
    edgeTypes,
    nodeTypes,
    params,
    clearPersistedStore,
    reactFlowInstance,
    setEdgeTypes,
    setNodeTypes,
    setParams,
  } = useFlowStore(useShallow(selector));

  useEffect(() => {
    clearPersistedStore();
    if (types.nodes) setNodeTypes(types.nodes);
    if (types.edges) setEdgeTypes(types.edges);
    if (config.name) setParams({ type: config.name });
    if (instance) setReactFLowInstance(instance);
  }, []);

  const handleVisualizeArtifact = async (year: number) => {
    if (year) {
      const result = await getArtifactByYearProjectionAndType(
        year,
        config.name,
      );

      if (result?.response?.type === 'error') {
        return toast.error(
          result?.response.message || 'Error obteniendo el artefacto',
        );
      }

      const artifactData = JSON.parse(result?.data?.artifact.data || '{}');

      if (artifactData.data.nodes.length === 0) {
        return toast.error('No se ha encontrado datos para el artefacto');
      }

      setNodes(artifactData.data.nodes);
      setEdges(artifactData.data.edges);

      return toast.success('Artefacto cargado correctamente');
    }
    return toast.error('No se ha encontrado el artefacto para este año');
  };

  const onSelectYear = async (year: number) => {
    setLoading(true);

    if (vision) {
      handleVisualizeArtifact(year);
      setLoading(false);
      return;
    }

    if (!company?.id) {
      setLoading(false);
      return toast.error('No se ha encontrado la empresa');
    }

    if (!params?.type) {
      setLoading(false);
      return toast.error('No se ha seleccionado un tipo de artefacto');
    }

    const result = await generateModel({
      companyId: company?.id!,
      year,
      type: params.type,
    });

    if (result?.response?.type === 'error' || !result.data) {
      setLoading(false);
      return toast.error(
        result?.response?.message || 'Error generando el modelo',
      );
    }

    const jsonResponse = JSON.parse(result.data.model);

    setNodes(jsonResponse.nodes);
    setEdges(jsonResponse.edges);
    setParams({ ...params, year });
    setLoading(false);
  };

  return (
    <>
      <ThinkingLoader show={loading} />
      <ReactFlow
        className="h-full w-full"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFLowInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        {slider && (
          <Panel position="top-left" className="min-w-[300px] gap-4">
            <Slider label="Proyección" step={1} onChangeEnd={onSelectYear} />
          </Panel>
        )}
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
}
