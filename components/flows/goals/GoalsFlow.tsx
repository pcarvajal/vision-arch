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
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { generateGoalsModel } from '@/actions/ai.actions';
import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import useUserStore from '@/store/userStore';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import ThinkingLoader from '../../shared/ThinkingLoader';
import YearsSlider from '../../shared/YearsSlider';
import { CustomDefaultEdge } from '../CustomDefaultEdge';
import { Flow } from '../Flow';
import { DefaultNode } from './nodes/DefaultNode';
import NodeProviderSelect from './providers/GoalsProvider';
import GoalsProviderSelect from './providers/GoalsProvider';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  objetiveNode: DefaultNode,
  problemNode: DefaultNode,
  conceptNode: DefaultNode,
  featureNode: DefaultNode,
  basicNode: DefaultNode,
  nodeProviderSelect: NodeProviderSelect,
};

const edgeTypes = {
  customDefaultEdge: CustomDefaultEdge,
};

export default function GoalsFlow() {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(2024);
  const [reactFlowInstance, setReactFLowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, OnEdgesChange] = useEdgesState(initialEdges);

  const company = useUserStore((state) => state.company);
  const setArtifact = useUserStore((state) => state.setArtifactObject);
  const deleteArtifact = useUserStore((state) => state.deleteArtifactObject);

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
    setYear(year);
    const companyId = company?.$id;
    if (!companyId) {
      setLoading(false);
      return toast.error('No se ha encontrado la empresa');
    }
    const result = await generateGoalsModel({
      companyId,
      year,
    });

    if (result?.message?.type === 'error') {
      setLoading(false);
      return toast.error(result.message.message);
    }

    const jsonResponse = JSON.parse(result);

    setNodes(jsonResponse.nodes);
    setEdges(jsonResponse.edges);

    setLoading(false);
  };

  useEffect(() => {
    const flow = reactFlowInstance?.toObject();
    if (flow) {
      deleteArtifact();
      setArtifact({ data: flow, year, type: 'goals' });
    }
  }, [reactFlowInstance?.getEdges(), reactFlowInstance?.getNodes()]);

  return (
    <>
      <ThinkingLoader show={loading} />
      <Flow
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
          <YearsSlider
            className="rounded-lg bg-black bg-opacity-45 p-4 text-white dark:bg-white dark:text-black"
            color="primary"
            defaultValue={2024}
            label="Proyección"
            minValue={2024}
            maxValue={2028}
            step={1}
            showSteps
            onChangeEnd={onSelectYear}
          />
        </Panel>
        <Panel position="top-right" className="flex gap-4">
          <SaveArtifactModal />
          <GoalsProviderSelect />
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </Flow>
    </>
  );
}
