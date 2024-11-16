'use client';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';
import ObjectiveNode from './nodes/ObjetiveNode';
import ProblemNode from './nodes/ProblemNode';
import CustomEdge from './edges/CustomEdge';
import NodeProviderSelect from './NodeProviderSelect';

const initialNodes: Node[] = [
  {
    id: '0',
    type: 'nodeProviderSelect',
    position: { x: 50, y: 0 },
    data: {},
  },
  {
    id: '1',
    type: 'objetiveNode',
    data: { title: 'Objetivo 1', description: 'Descripción del objetivo 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    type: 'problemNode',
    data: { title: 'Problema 1', description: 'Descripción del problema 1' },
    position: { x: 350, y: 200 },
  },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
  objetiveNode: ObjectiveNode,
  problemNode: ProblemNode,
  nodeProviderSelect: NodeProviderSelect,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export default function CommercialObjetivesFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, OnEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length + 1}`,
        type: 'customEdge',
      };
      setEdges([...edges, edge]);
    },
    [edges, setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={OnEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
