'use client';

import {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
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
import { ArtifactCategory, ArtifactType, CustomNode } from '@/types';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { SelectNodes } from './components/SelectNodes';

interface ArtifactFlowProps<T> {
  types: ArtifactType[];
  category: ArtifactCategory;
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  customNodes: CustomNode[];
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

  const [reactFlowInstance, setReactFLowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialFlow.initialNodes,
  );
  const [edges, setEdges, OnEdgesChange] = useEdgesState(
    initialFlow.initialEdges,
  );
  const [artifactSelected, setArtifactSelected] = useState<ArtifactType | null>(
    null,
  );

  const onConnect = useCallback(
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
  );

  const onSelectYear = async (year: number) => {
    setLoading(true);

    if (!company?.id) {
      setLoading(false);
      return toast.error('No se ha encontrado la empresa');
    }

    if (!artifactSelected)
      return toast.error('No se ha seleccionado un tipo de artefacto');

    const result = await generateModel({
      companyId: company.id,
      year,
      type: artifactSelected,
    });

    if (result?.message?.type === 'error') {
      setLoading(false);
      return toast.error(result.message.message);
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

  return (
    <>
      <ThinkingLoader show={loading} />
      <ReactFlow
        className="h-full w-full"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={OnEdgesChange}
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
