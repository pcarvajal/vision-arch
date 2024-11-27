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
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { generateObjetivesModel } from '@/actions/ai.actions';
import useUserStore from '@/store/userStore';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import Loader from '../layout/Loader';
import ThinkingLoader from '../shared/ThinkingLoader';
import YearsSlider from '../shared/YearsSlider';
import { DeleteButtonEdge } from './edges/DeleteButtonEdge';
import { DefaultNode } from './nodes/GoalsNodes/DefaultNode';
import NodeProviderSelect from './providers/GoalsProvider';

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
  deleteButtonEdge: DeleteButtonEdge,
};

export default function GoalsFlow() {
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, OnEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length + 1}`,
        type: 'deleteButtonEdge',
      };
      setEdges([...edges, edge]);
    },
    [edges, setEdges],
  );

  const onSelectYear = async (year: number) => {
    setLoading(true);
    const company = user?.companyId;
    if (!company) {
      setLoading(false);
      return toast.error('No se ha encontrado la empresa');
    }
    const result = await generateObjetivesModel({
      companyId: company,
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

  return (
    <div className="flex h-screen w-screen">
      <ThinkingLoader show={loading} />
      <ReactFlow
        className="overflow-hidden"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={OnEdgesChange}
        onConnect={onConnect}
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
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
