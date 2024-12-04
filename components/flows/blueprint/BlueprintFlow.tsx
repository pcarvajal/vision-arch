'use client';

import ThinkingLoader from '@/components/shared/ThinkingLoader';
import {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { CustomDefaultEdge } from '../CustomDefaultEdge';
import { Flow } from '../Flow';
import { ActorsNode } from './nodes/ActorsNode';
import { defaultNode } from './nodes/DefaultNode';
import { SubflowNode } from './nodes/SubflowNode';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'subflowNode',
    position: { x: 750, y: 5 },
    data: {},
  },
  {
    id: '2',
    type: 'actorsNode',
    position: { x: 250, y: 5 },
    data: {
      actorName: 'Persona',
      backgroundColor: 'bg-pink-600',
      textColor: 'text-white',
    },
    parentId: '1',
    extent: 'parent',
  },
  {
    id: '3',
    type: 'appNode',
    position: { x: 350, y: 5 },
    data: {
      title: 'Caracteristica 1',
      backgroundColor: 'bg-yellow-400',
      textColor: 'text-white',
    },
    parentId: '1',
    extent: 'parent',
  },
  {
    id: '4',
    type: 'appNode',
    position: { x: 450, y: 5 },
    data: {
      title: 'Caracteristica 1',
      backgroundColor: 'bg-gray-800',
      textColor: 'text-white',
    },
  },
  {
    id: '5',
    type: 'appNode',
    position: { x: 550, y: 5 },
    data: {
      title: 'Caracteristica 1',
      backgroundColor: 'bg-indigo-500',
      textColor: 'text-white',
    },
  },
  {
    id: '6',
    type: 'appNode',
    position: { x: 650, y: 5 },
    data: {
      title: 'Caracteristica 1',
      backgroundColor: 'bg-purple-900',
      textColor: 'text-white',
    },
  },
];
const initialEdges: Edge[] = [];

const nodeTypes = {
  subflowNode: SubflowNode,
  actorsNode: ActorsNode,
  appNode: defaultNode,
};

const edgeTypes = {
  customDefaultEdge: CustomDefaultEdge,
};

export default function BlueprintFlow() {
  const [loading, setLoading] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, OnEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFLowInstance] =
    useState<ReactFlowInstance | null>(null);

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
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setReactFLowInstance}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </Flow>
    </>
  );
}