import { FlowType } from '@/types';
import { DeleteEdge } from './components/edges/DeleteEdge';
import { AreaNode } from './components/nodes/AreaNode';
import { NoteNode } from './components/nodes/NoteNode';
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
    noteNode: NoteNode,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
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
    noteNode: NoteNode,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

// CSVLOD
const policiesFlowTypes: FlowType = {
  nodeTypes: {
    policyTypeAreaNode: AreaNode,
    policyTypeLabelNode: VerticalTitleNode,
    policyAreaNode: AreaNode,
    policyTextBlockNode: TextBlockNode,
    policyDescriptionAreaNode: AreaNode,
    policyDescriptionTextBlockNode: TextBlockNode,
    textBlockNode: TextBlockNode,
    noteNode: NoteNode,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

const principlesFlowTypes: FlowType = {
  nodeTypes: {
    principleTitleAndItemsNode: TitleAndItemsNode,
    noteNode: NoteNode,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

const guidelinesFlowTypes: FlowType = {
  nodeTypes: {
    standardAreaNode: AreaNode,
    guidelineAreaNode: AreaNode,
    standardTextBlockNode: TextBlockNode,
    guidelineTextBlockNode: TextBlockNode,
    noteNode: NoteNode,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

export {
  goalsFlowTypes,
  blueprintsFlowTypes,
  guidelinesFlowTypes,
  policiesFlowTypes,
  principlesFlowTypes,
};
