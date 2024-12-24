'use client';

import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  ReactFlow,
  useReactFlow,
  type EdgeTypes,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { generateModel } from '@/actions/ai.actions';
import { getArtifactByYearProjectionAndType } from '@/actions/artifact.actions';
import YearsSlider from '@/components/diagrams/components/YearsSlider';
import ThinkingLoader from '@/components/shared/ThinkingLoader';
import { IArtifactConfig } from '@/index';
import useArtifactFlowStore from '@/store/artifactFlowStore';
import useUserStore from '@/store/userStore';
import Dagre from '@dagrejs/dagre';
import { Button } from '@nextui-org/react';
import { MoveDown, MoveRight } from 'lucide-react';
import { useCallback, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useFlow } from '../hooks/useFlow';

const getLayoutedElements = (nodes: Node[], edges: Edge[], options: any) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

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
  } = useFlow(config);
  const { fitView } = useReactFlow();
  const userStore = useUserStore((state) => state);
  const flowStore = useArtifactFlowStore((state) => state);
  const { loading, setLoading, user } = userStore;
  const { setParams, clearPersistedStore } = flowStore;

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

    if (vision) {
      handleVisualizeArtifact(year);
      setLoading(false);
      return;
    }

    if (!user?.company?.id) {
      setLoading(false);
      return toast.error('No se ha encontrado la empresa');
    }

    if (!artifactSelected) {
      setLoading(false);
      return toast.error('No se ha seleccionado un tipo de artefacto');
    }
    setYear(year);

    const result = await generateModel({
      companyId: userStore?.user?.company?.id!,
      year,
      type: artifactSelected,
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
    setLoading(false);
  };

  useEffect(() => {
    flowStore.setParams({
      year,
      type: artifactSelected,
    });
    flowStore.setEdges(edges);
    flowStore.setNodes(nodes);
    flowStore.setViewport(viewport);
    return () => {
      clearPersistedStore();
    };
  }, [nodes]);

  useEffect(() => {
    setArtifactSelected(type);
    return () => {
      setNodes([]);
      setEdges([]);
      clearPersistedStore();
    };
  }, [type]);

  const flowNodetypes = useMemo(
    () => ({
      nodes: types.nodes,
    }),
    [types.nodes],
  );

  const onLayout = useCallback(
    (direction: string) => {
      console.log(nodes);
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges],
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
        nodeTypes={flowNodetypes.nodes}
        edgeTypes={types.edges}
        fitView
      >
        {slider && (
          <Panel position="top-left" className="min-w-[300px] gap-4">
            <YearsSlider
              label="Proyección"
              step={1}
              onChangeEnd={onSelectYear}
            />
          </Panel>
        )}
        <Panel position="top-right" className="flex flex-row gap-2">
          <div>
            <Button
              isIconOnly
              aria-label="TB"
              color="default"
              onPress={() => onLayout('TB')}
            >
              <MoveDown />
            </Button>
          </div>
          <div>
            <Button
              isIconOnly
              aria-label="LR"
              color="default"
              onPress={() => onLayout('LR')}
            >
              <MoveRight />
            </Button>
          </div>
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
}
