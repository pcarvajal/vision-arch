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
  type EdgeTypes,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { generateModel } from '@/actions/ai.actions';
import YearsSlider from '@/components/diagrams/components/YearsSlider';
import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import ThinkingLoader from '@/components/shared/ThinkingLoader';
import useArtifactFlowStore from '@/store/artifactFlowStore';
import useUserStore from '@/store/userStore';
import { ArtifactCategory, ArtifactType, CustomNodeData } from '@/types';
import { use, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { SelectNodes } from './components/SelectNodes';

interface ArtifactFlowProps<T> {
  types: ArtifactType[];
  category: ArtifactCategory;
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  customNodes: CustomNodeData[];
  initialFlow?: { initialNodes: Node[]; initialEdges: Edge[] };
}

export default function ArtifactFlow<T>({
  types,
  category,
  customNodes,
  nodeTypes,
  edgeTypes,
  initialFlow = { initialNodes: [], initialEdges: [] },
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

  const [artifactSelected, setArtifactSelected] = useState<ArtifactType | null>(
    null,
  );
  const [reactFlowInstance, setReactFLowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes] = useNodesState(initialFlow.initialNodes);
  const [edges, setEdges] = useEdgesState(initialFlow.initialEdges);

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
      const edge = { ...connection, animated: true, type: 'deleteButtonEdge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  /*   const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length + 1}`,
        type: 'customDefaultEdge',
      };
      setEdges([...edges, edge]);
    },
    [edges, setEdges],
  ); */

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

    const result = await generateModel({
      companyId: company.id,
      year,
      type: artifactSelected,
    });
    console.log(result);
    if (result?.type === 'error') {
      setLoading(false);
      return toast.error(result?.message || 'Error generando el modelo');
    }

    const jsonResponse = JSON.parse(result);

    setNodes(jsonResponse.nodes);
    setEdges(jsonResponse.edges);
    setArtifactFlow({
      data: jsonResponse,
      type: artifactSelected,
      details: null,
      year,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (types) {
      if (types.length > 0 && types.length < 2) {
        setArtifactSelected(types[0]);
      }
    }
  }, [types]);

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
      >
        <Panel position="top-left" className="min-w-[300px] gap-4">
          <YearsSlider label="Proyección" step={1} onChangeEnd={onSelectYear} />
        </Panel>
        <Panel position="top-right" className="flex gap-4">
          <SaveArtifactModal />
          <SelectNodes nodes={customNodes} />
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
}
