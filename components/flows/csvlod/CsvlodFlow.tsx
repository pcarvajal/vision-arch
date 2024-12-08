'use client';

import ThinkingLoader from '@/components/shared/ThinkingLoader';
import '@xyflow/react/dist/style.css';
import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import {
  csvlodArtifactsSelectorItems,
  csvlodGuidelinesNodes,
  csvlodPoliciesNodes,
  csvlodPrinciplesNodes,
} from '@/config/constants';
import { CsvlodArtifactsEnum } from '@/config/enum';
import { CustomNode } from '@/types/types';
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
import { ProviderSchemaNode } from '../ProviderSchemaNode';
import CsvlodArtifactSelector from './CsvlodArtifactSelector';
import { AreaNode } from './nodes/AreaNode';
import { TextBlockNode } from './nodes/TextBlockNode';
import { TitleAndItemsNode } from './nodes/TitleAndItemsNode';
import { VerticalLabelNode } from './nodes/VerticalLabelNode';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  // Policies Nodes
  policyTypeAreaNode: AreaNode,
  policyTypeLabelNode: VerticalLabelNode,
  policyAreaNode: AreaNode,
  policyTextBlockNode: TextBlockNode,
  policyDescriptionAreaNode: AreaNode,
  policyDescriptionTextBlockNode: TextBlockNode,
  // Policy Nodes
  principleTitleAndItemsNode: TitleAndItemsNode,
  // Guidelines Nodes
  standardAreaNode: AreaNode,
  guidelineAreaNode: AreaNode,
  standardTextBlockNode: TextBlockNode,
  guidelineTextBlockNode: TextBlockNode,
};

const edgeTypes = {
  customDefaultEdge: CustomDefaultEdge,
};

export const CsvlodFlow = () => {
  const [loading, setLoading] = useState(false);
  const [nodesForArtifact, setNodesForArtifact] =
    useState<CustomNode[]>(csvlodPoliciesNodes);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, OnEdgesChange] = useEdgesState(initialEdges);

  const handleArtifactSelector = (item: string) => {
    switch (item) {
      case CsvlodArtifactsEnum.PRINCIPLES:
        setNodesForArtifact(csvlodPrinciplesNodes);
        break;
      case CsvlodArtifactsEnum.POLICIES:
        setNodesForArtifact(csvlodPoliciesNodes);
      case CsvlodArtifactsEnum.GUIDELINES:
        setNodesForArtifact(csvlodGuidelinesNodes);
      default:
        break;
    }
  };

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
          <CsvlodArtifactSelector
            items={csvlodArtifactsSelectorItems}
            onArtifactSelect={handleArtifactSelector}
          />
          <ProviderSchemaNode nodes={nodesForArtifact} />
          <SaveArtifactModal />
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </Flow>
    </>
  );
};
