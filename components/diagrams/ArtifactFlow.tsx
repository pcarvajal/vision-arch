'use client';

import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  type EdgeTypes,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { generateModel } from '@/actions/ai.actions';
import { getArtifactByYearProjectionAndType } from '@/actions/artifact.actions';
import YearsSlider from '@/components/diagrams/components/YearsSlider';
import ThinkingLoader from '@/components/shared/ThinkingLoader';
import useArtifactFlowStore from '@/store/artifactFlowStore';
import useUserStore from '@/store/userStore';
import { ArtifactProps } from '@/types';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useFlow } from '../hooks/useFlow';

interface ArtifactFlowProps<T> {
  artifact: ArtifactProps;
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
  yearSlider?: boolean;
  visualize?: boolean;
}

export default function ArtifactFlow<T>({
  artifact,
  nodeTypes,
  edgeTypes,
  yearSlider = true,
  visualize = false,
}: ArtifactFlowProps<T>) {
  const loading = useUserStore((state) => state.loading);
  const setLoading = useUserStore((state) => state.setLoading);
  const company = useUserStore((state) => state.company);
  const setArtifactFlow = useArtifactFlowStore(
    (state) => state.setArtifactFlow,
  );
  const deleteArtifactFlow = useArtifactFlowStore(
    (state) => state.deleteArtifactFlow,
  );

  const {
    artifactSelected,
    setYear,
    year,
    nodes,
    edges,
    viewport,
    setNodes,
    setEdges,
    setArtifactSelected,
    type,
    onConnect,
    onNodesChange,
    onEdgesChange,
    setReactFLowInstance,
  } = useFlow(artifact);

  const handleVisualizeArtifact = async (year: number) => {
    if (year) {
      console.log('request', { year, artifact: artifact.type });
      const result = await getArtifactByYearProjectionAndType(
        year,
        artifact.type,
      );

      console.log('response', result);

      if (result?.type === 'error') {
        return toast.error(result?.message || 'Error obteniendo el artefacto');
      }

      if (result.length > 1) {
        return toast.error(
          'Mas de un artefacto encontrado para este año, revisa tus datos',
        );
      }

      if (result.length === 0) {
        return toast.error('No se ha encontrado el artefacto para este año');
      }

      const artifactData = JSON.parse(result[0].data);

      console.log('target', artifactData);
      setNodes(artifactData.data.nodes);
      setEdges(artifactData.data.edges);
      viewport.x = artifactData.data.viewport.x;
      viewport.y = artifactData.data.viewport.y;
      viewport.zoom = artifactData.data.viewport.zoom;

      return toast.success('Artefacto cargado correctamente');
    }
    return toast.error('No se ha encontrado el artefacto para este año');
  };

  const onSelectYear = async (year: number) => {
    setLoading(true);
    setYear(year);

    if (visualize) {
      handleVisualizeArtifact(year);
      setLoading(false);
      return;
    }

    if (!company?.id) {
      setLoading(false);
      return toast.error('No se ha encontrado la empresa');
    }

    if (!artifactSelected) {
      setLoading(false);
      return toast.error('No se ha seleccionado un tipo de artefacto');
    }
    setYear(year);

    const result = await generateModel({
      companyId: company.id,
      year,
      type: artifactSelected,
    });

    if (result?.type === 'error') {
      setLoading(false);
      return toast.error(result?.message || 'Error generando el modelo');
    }

    const jsonResponse = JSON.parse(result);

    setNodes(jsonResponse.nodes);
    setEdges(jsonResponse.edges);

    setLoading(false);
  };

  useEffect(() => {
    setArtifactFlow({
      id: artifact.id,
      year,
      data: { nodes, edges, viewport },
      type: artifactSelected,
    });

    return () => {
      deleteArtifactFlow();
    };
  }, [nodes, edges, viewport]);

  useEffect(() => {
    setArtifactSelected(type);
    return () => {
      setNodes([]);
      setEdges([]);
      deleteArtifactFlow();
    };
  }, [type]);

  const flowNodetypes = useMemo(
    () => ({
      nodeTypes,
    }),
    [nodeTypes],
  );

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
        nodeTypes={flowNodetypes.nodeTypes}
        edgeTypes={edgeTypes}
      >
        {yearSlider && (
          <Panel position="top-left" className="min-w-[300px] gap-4">
            <YearsSlider
              label="Proyección"
              step={1}
              onChangeEnd={onSelectYear}
            />
          </Panel>
        )}
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
}
