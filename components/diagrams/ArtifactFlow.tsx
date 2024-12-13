'use client';

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  Panel,
  ReactFlow,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  useViewport,
  type EdgeTypes,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { generateModel } from '@/actions/ai.actions';
import YearsSlider from '@/components/diagrams/components/YearsSlider';
import ThinkingLoader from '@/components/shared/ThinkingLoader';
import { yearRange } from '@/config/constants';
import useArtifactFlowStore from '@/store/artifactFlowStore';
import useUserStore from '@/store/userStore';
import { ArtifactProps, ArtifactType } from '@/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

interface ArtifactFlowProps<T> {
  artifact: ArtifactProps;
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
}

export default function ArtifactFlow<T>({
  artifact: {
    initialFlow,
    category,
    categoryLabel,
    type,
    typeLabel,
    presetNodes,
  },
  nodeTypes,
  edgeTypes,
}: ArtifactFlowProps<T>) {
  const loading = useUserStore((state) => state.loading);
  const setLoading = useUserStore((state) => state.setLoading);
  const company = useUserStore((state) => state.company);
  const viewport = useViewport();

  const setArtifactFlow = useArtifactFlowStore(
    (state) => state.setArtifactFlow,
  );
  const deleteArtifactFlow = useArtifactFlowStore(
    (state) => state.deleteArtifactFlow,
  );

  const [year, setYear] = useState<number>(yearRange.default);

  const [artifactSelected, setArtifactSelected] = useState<ArtifactType>(type);

  const [reactFlowInstance, setReactFLowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes] = useNodesState(initialFlow?.nodes || []);
  const [edges, setEdges] = useEdgesState(initialFlow?.edges || []);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, animated: true, type: 'deleteEdge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  const onSelectYear = async (year: number) => {
    setLoading(true);

    if (!company?.id) {
      setLoading(false);
      return toast.error('No se ha encontrado la empresa');
    }

    if (!artifactSelected) {
      setLoading(false);
      return toast.error('No se ha seleccionado un tipo de artefacto');
    }
    setYear(year);

    console.log('ARTIFACT', artifactSelected);

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

    console.log('JSON RESPONSE', jsonResponse);

    setNodes(jsonResponse.nodes);
    setEdges(jsonResponse.edges);

    setLoading(false);
  };

  useEffect(() => {
    setArtifactFlow({
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
        <Panel position="top-left" className="min-w-[300px] gap-4">
          <YearsSlider label="Proyección" step={1} onChangeEnd={onSelectYear} />
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
}
