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
    titleAndIcon: TitleAndIcon,
    title: Title,
    note: Note,
    titleAndDescription: TitleAndDescription,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

// CSVLOD
const policiesFlowTypes = {
  nodeTypes: {
    note: Note,
    title: Title,
    titleVertical: TitleVertical,
    area: Area,
    textBlock: TextBlock,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

const principlesFlowTypes = {
  nodeTypes: {
    titleAndItems: TitleAndItems,
    note: Note,
  },
  edgeTypes: {
    deleteEdge: DeleteEdge,
  },
};

const guidelinesFlowTypes = {
  nodeTypes: {
    area: Area,
    textBlock: TextBlock,
    note: Note,
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
