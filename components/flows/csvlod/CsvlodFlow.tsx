'use client';

import ThinkingLoader from '@/components/shared/ThinkingLoader';
import '@xyflow/react/dist/style.css';
import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import {
  csvlodArtifactsSelectorItems,
  csvlodPoliciesNodes,
} from '@/config/constants';
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useState } from 'react';
import { CustomDefaultEdge } from '../CustomDefaultEdge';
import { Flow } from '../Flow';
import { ProviderNode } from '../ProviderNode';
import { ProviderSchemaNode } from '../ProviderSchemaNode';
import CsvlodArtifactSelector from './CsvlodArtifactSelector';
import { AreaNode } from './nodes/AreaNode';
import { TextBlockNode } from './nodes/TextBlockNode';
import { VerticalLabelNode } from './nodes/VerticalLabelNode';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  policyTypeAreaNode: AreaNode,
  policyTypeLabelNode: VerticalLabelNode,
  policyAreaNode: AreaNode,
  policyTextBlockNode: TextBlockNode,
  policyDescriptionAreaNode: AreaNode,
  policyDescriptionTextBlockNode: TextBlockNode,
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
        snapToGrid={true}
        elevateNodesOnSelect={false}
      >
        <Panel position="top-right" className="flex gap-4">
          <CsvlodArtifactSelector items={csvlodArtifactsSelectorItems} />
          <ProviderSchemaNode nodes={csvlodPoliciesNodes} />
          <SaveArtifactModal />
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </Flow>
    </>
  );
};
