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
  Panel,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';
import ObjectiveNode from './nodes/ObjetiveNode';
import ProblemNode from './nodes/ProblemNode';
import CustomEdge from './edges/CustomEdge';
import NodeProviderSelect from './providers/GoalsProviderSelect';
import FeatureNode from './nodes/FeatureNode';
import ConceptNode from './nodes/ConceptNode';
import YearsSlider from './YearsSlider';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  objetiveNode: ObjectiveNode,
  problemNode: ProblemNode,
  conceptNode: ConceptNode,
  featureNode: FeatureNode,
  nodeProviderSelect: NodeProviderSelect,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export default function GoalsFlow() {
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
        className="overflow-hidden"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={OnEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Panel position="top-left" className="min-w-[300px] gap-4">
          <YearsSlider
            className="rounded-lg bg-black bg-opacity-45 p-4 text-white dark:bg-white dark:text-black"
            color="danger"
            defaultValue={2025}
            label="Proyección"
            minValue={2024}
            maxValue={2028}
            step={1}
            showSteps
          />
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
