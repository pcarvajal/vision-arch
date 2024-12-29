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
import { yearRange } from '@/config/constants';
import { IArtifactConfig, IFlow } from '@/index';
import { flowSelector } from '@/store/flow/flowSelector';
import useFlowStore from '@/store/flow/flowStore';
import useUserStore from '@/store/user/userStore';
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
    params,
    clearPersistedStore,
    setParams,
  } = useFlowStore(useShallow(flowSelector));

  useEffect(() => {
    clearPersistedStore();
    if (config.name) setParams({ type: config.name, year: yearRange.default });
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

      const artifactData: IFlow = JSON.parse(
        result?.data?.artifact.data || '{}',
      );

      if (artifactData.nodes.length === 0) {
        return toast.error('No se ha encontrado datos para el artefacto');
      }

      setNodes(artifactData.nodes);
      setEdges(artifactData.edges);

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
        nodeTypes={types.nodes}
        edgeTypes={types.edges}
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
