import { DeleteEdge } from './components/edges/DeleteEdge';
import { AreaNode } from './components/nodes/AreaNode';
import { TextBlockNode } from './components/nodes/TextBlockNode';
import { TitleAndItemsNode } from './components/nodes/TitleAndItemsNode';
import { TitleDescriptionNode } from './components/nodes/TitleDescriptionNode';
import { TitleIconNode } from './components/nodes/TitleIconNode';
import { TitleNode } from './components/nodes/TitleNode';
import { VerticalTitleNode } from './components/nodes/VerticalTitlelNode';

// Objetives
const goalsFlowTypes = {
  nodeTypes: {
    objetiveNode: TitleDescriptionNode,
    problemNode: TitleDescriptionNode,
    conceptNode: TitleDescriptionNode,
    featureNode: TitleDescriptionNode,
    basicNode: TitleDescriptionNode,
  },
  edgeTypes: {
    deleteButtonEdge: DeleteEdge,
  },
};

// Togaf
const blueprintsFlowTypes = {
  nodeTypes: {
    actorNode: TitleIconNode,
    systemNode: TitleNode,
    processNode: TitleNode,
    dataNode: TitleNode,
    infrastructureNode: TitleNode,
  },
  edgeTypes: {
    deleteButtonEdge: DeleteEdge,
  },
};

// CSVLOD
const policiesFlowTypes = {
  nodeTypes: {
    policyTypeAreaNode: AreaNode,
    policyTypeLabelNode: VerticalTitleNode,
    policyAreaNode: AreaNode,
    policyTextBlockNode: TextBlockNode,
    policyDescriptionAreaNode: AreaNode,
    policyDescriptionTextBlockNode: TextBlockNode,
  },
  edgeTypes: {
    deleteButtonEdge: DeleteEdge,
  },
};

const principlesFlowTypes = {
  nodeTypes: {
    principleTitleAndItemsNode: TitleAndItemsNode,
  },
  edgeTypes: {
    deleteButtonEdge: DeleteEdge,
  },
};

const guidelinesFlowTypes = {
  nodeTypes: {
    standardAreaNode: AreaNode,
    guidelineAreaNode: AreaNode,
    standardTextBlockNode: TextBlockNode,
    guidelineTextBlockNode: TextBlockNode,
  },
  edgeTypes: {
    deleteButtonEdge: DeleteEdge,
  },
};

export {
  goalsFlowTypes,
  blueprintsFlowTypes,
  guidelinesFlowTypes,
  policiesFlowTypes,
  principlesFlowTypes,
};
