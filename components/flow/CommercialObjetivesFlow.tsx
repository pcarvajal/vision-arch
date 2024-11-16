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
import AreaNode from './nodes/AreaNode';
import FeatureNode from './nodes/FeatureNode';

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const nodeTypes = {
  objetiveNode: ObjectiveNode,
  problemNode: ProblemNode,
  areaNode: AreaNode,
  featureNode: FeatureNode,
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
    <div className="flex h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={OnEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
