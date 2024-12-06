'use client';

import ThinkingLoader from '@/components/shared/ThinkingLoader';
import '@xyflow/react/dist/style.css';
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useState } from 'react';
import { CustomDefaultEdge } from '../CustomDefaultEdge';
import { Flow } from '../Flow';
import { AreaNode } from './nodes/AreaNode';
import { TextNode } from './nodes/TextNode';

const initialNodes: Node[] = [
  { id: '1', type: 'areaNode', position: { x: 200, y: 200 }, data: {} },
  {
    id: '2',
    type: 'textNode',
    position: { x: 100, y: 100 },
    data: {},
    parentId: '1',
  },
];
const initialEdges: Edge[] = [];

const nodeTypes = {
  textNode: TextNode,
  areaNode: AreaNode,
};

const edgeTypes = {
  customDefaultEdge: CustomDefaultEdge,
};

export const CsvlodFlow = () => {
  const [loading, setLoading] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, OnEdgesChange] = useEdgesState(initialEdges);

  return (
    <>
      <ThinkingLoader show={loading} />
      <Flow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={OnEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </Flow>
    </>
  );
};
