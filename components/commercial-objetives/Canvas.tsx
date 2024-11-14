import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Problema 1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Problema 2' } },
  { id: '3', position: { x: 0, y: 200 }, data: { label: 'Objetivo 1' } },
  { id: '4', position: { x: 0, y: 300 }, data: { label: 'Objetivo 2' } },
  { id: '5', position: { x: 0, y: 400 }, data: { label: 'Objetivo 3' } },
  { id: '6', position: { x: 0, y: 500 }, data: { label: 'Problema 3' } },
  { id: '7', position: { x: 0, y: 600 }, data: { label: 'Problema 4' } },
  { id: '8', position: { x: 0, y: 700 }, data: { label: 'Problema 5' } },
  { id: '9', position: { x: 0, y: 800 }, data: { label: 'Problema 6' } },
  { id: '10', position: { x: 0, y: 900 }, data: { label: 'Problema 3' } },
  { id: '11', position: { x: 0, y: 1000 }, data: { label: 'Problema 4' } },
  { id: '12', position: { x: 0, y: 1100 }, data: { label: 'Problema 5' } },
  { id: '13', position: { x: 0, y: 1200 }, data: { label: 'Problema 6' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
