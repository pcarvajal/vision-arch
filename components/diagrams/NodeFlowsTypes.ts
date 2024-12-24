import { DeleteEdge } from './components/edges/DeleteEdge';
import { Area } from './components/nodes/Area';
import { Note } from './components/nodes/Note';
import { TextBlock } from './components/nodes/TextBlock';
import { Title } from './components/nodes/Title';
import { TitleAndIcon } from './components/nodes/TitleAndIcon';
import { TitleAndItems } from './components/nodes/TitleAndItems';
import { TitleAndDescription } from './components/nodes/TitleDescription';
import { TitleVertical } from './components/nodes/TitleVertical';

// Objetives
const goalsFlowTypes = {
  nodeTypes: {
    titleAndDescription: TitleAndDescription,
    note: Note,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

// Togaf
const blueprintsFlowTypes = {
  nodeTypes: {
    actorNode: TitleAndIcon,
    systemNode: Title,
    processNode: Title,
    dataNode: Title,
    infrastructureNode: Title,
    noteNode: Note,
    basicNode: TitleAndDescription,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

// CSVLOD
const policiesFlowTypes = {
  nodeTypes: {
    policyTypeAreaNode: Note,
    policyTypeLabelNode: TitleVertical,
    policyAreaNode: Area,
    policyTextBlockNode: TextBlock,
    policyDescriptionAreaNode: Area,
    policyDescriptionTextBlockNode: TextBlock,
    textBlockNode: TextBlock,
    noteNode: Note,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

const principlesFlowTypes = {
  nodeTypes: {
    principleTitleAndItemsNode: TitleAndItems,
    noteNode: Note,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

const guidelinesFlowTypes = {
  nodeTypes: {
    standardAreaNode: Area,
    guidelineAreaNode: Area,
    standardTextBlockNode: TextBlock,
    guidelineTextBlockNode: TextBlock,
    noteNode: Note,
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
