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
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Loader from '@/components/layout/Loader';
import YearsSlider from '@/components/shared/YearsSlider';
import { Artifact } from '@/types/types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CustomDefaultEdge } from '../CustomDefaultEdge';
import { Flow } from '../Flow';
import { DefaultNode } from './nodes/DefaultNode';
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
  deleteButtonEdge: CustomDefaultEdge,
};

interface GoalsFlowVisualizeProps {
  goals: Artifact[];
}

export default function GoalsFlowVisualize({ goals }: GoalsFlowVisualizeProps) {
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState<number[]>([]);
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

  useEffect(() => {
    const yearsArr = goals.map((goal) => {
      return goal.yearProjection;
    });
    setYears(yearsArr);
  }, [goals]);

  const onChangeYear = (year: number) => {
    setLoading(true);
    const goal = goals.find((g) => g.yearProjection === year);
    if (goal) {
      const data = JSON.parse(goal.data);
      setNodes(data.data.nodes);
      setEdges(data.data.edges);
    } else {
      setNodes([]);
      setEdges([]);
      toast.warning('No se encontraron datos para el año seleccionado');
    }
    setLoading(false);
  };

  return (
    <>
      <Loader show={loading} />
      <Flow
        className="h-full w-full"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={OnEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Panel position="top-left" className="min-w-[300px] gap-4">
          {years && years.length > 0 && (
            <YearsSlider
              className="rounded-lg bg-black bg-opacity-45 p-4 text-white dark:bg-white dark:text-black"
              color="primary"
              defaultValue={years[0]}
              label="Proyección"
              minValue={years[0]}
              maxValue={years.slice(-1)[0] || 2028}
              step={1}
              showSteps
              onChangeEnd={onChangeYear}
            />
          )}
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </Flow>
    </>
  );
}
