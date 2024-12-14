import { CustomNode } from '@/types';
import { Node, NodeProps, ReactFlowJsonObject } from '@xyflow/react';
import { TitleDescriptionNode } from '../components/diagrams/components/nodes/TitleDescriptionNode';

// App
declare type Role = 'owner' | 'admin' | 'user';

declare type ArtifactCategory = 'csvlod' | 'togaf' | 'objetives';
declare type ArtifactType =
  | 'goals'
  | 'blueprints'
  | 'policies'
  | 'principles'
  | 'guidelines';
declare type ArtifactDimension = 'considerations' | 'standards';

declare type GoalsNodeType =
  | 'objetiveNode'
  | 'problemNode'
  | 'conceptNode'
  | 'featureNode';
declare type BlueprintNodeType =
  | 'actorNode'
  | 'systemNode'
  | 'processNode'
  | 'dataNode'
  | 'infrastructureNode'
  | 'subflowNode';
declare type CsvlodPoliciesNodeType =
  | 'policyAreaNode'
  | 'policyTypeAreaNode'
  | 'policyDescriptionAreaNode'
  | 'policyTypeLabelNode'
  | 'policyTextBlockNode'
  | 'policyDescriptionTextBlockNode';
declare type CsvlodPrinciplesNodeType = 'principleTitleAndItemsNode';
declare type CsvlodGuidelinesNodeType =
  | 'standardAreaNode'
  | 'guidelineAreaNode'
  | 'standardTextBlockNode'
  | 'guidelineTextBlockNode';
declare type BaseNodeType =
  | 'areaNode'
  | 'textBlockNode'
  | 'titleAndItemsNode'
  | 'titleDescriptionNode'
  | 'titleIconNode'
  | 'titleNode'
  | 'VerticalTitleNode';
declare type SharedNodeType = 'noteNode' | 'basicNode';
declare type NodeBaseType = BaseNodeType | SharedNodeType;
declare type CustomNodeType =
  | GoalsNodeType
  | BlueprintNodeType
  | CsvlodPoliciesNodeType
  | CsvlodPrinciplesNodeType
  | CsvlodGuidelinesNodeType
  | SharedNodeType;
declare type CustomNodeProps =
  | AreaNodeProps
  | NoteNodeProps
  | TextBlockNodeProps
  | TitleAndItemsNodeProps
  | TitleDescriptionNodeProps
  | TitleIconNodeProps
  | TitleNodeProps
  | VerticalTitleNodeProps;

declare interface ArtifactProps {
  id?: string;
  category: ArtifactCategory;
  categoryLabel: string;
  type: ArtifactType;
  typeLabel: string;
  presetNodes: GenericNodeProps[];
  initialFlow?: ReactFlowJsonObject;
}

// Custom Nodes
declare type CustomNodeData = {
  nodeBaseType: NodeBaseType;
  label: string;
  description?: string;
  width?: number;
  height?: number;
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
  zIndex?: number;
  icon?: string;
  iconColor?: string;
} & Record<string, unknown>;
// Custom Node Props
declare type AreaNodeProps = CustomNodeData & {
  nodeData: {
    title: string;
  };
} & CustomNodeData;

declare type NoteNodeProps = CustomNodeData & {
  nodeData: {
    title: string;
    description: string;
  };
};

declare type TextBlockNodeProps = CustomNodeData & {
  nodeData: {
    textBlock: string;
    placeholder: string;
  };
} & CustomNodeData;

declare type TitleAndItemsNodeProps = CustomNodeData & {
  nodeData: {
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      type: 'TextArea' | 'Input';
      value: string;
    }[];
  };
} & CustomNodeData;

declare type TitleDescriptionNodeProps = CustomNodeData & {
  nodeData: {
    title: string;
    titlePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
  };
} & CustomNodeData;

declare type TitleIconNodeProps = CustomNodeData & {
  nodeData: {
    title: string;
    titlePlaceholder: string;
    icon: string;
  };
} & CustomNodeData;

declare type TitleNodeProps = CustomNodeData & {
  nodeData: {
    title: string;
    placeholder: string;
  };
} & CustomNodeData;

declare type VerticalTitleNodeProps = CustomNodeData & {
  nodeData: {
    title: string;
    placeholder: string;
  };
};

declare interface GenericNodeProps<T extends AllNodeProps = AllNodeProps> {
  node: T;
  additionalData?: Record<string, unknown>;
}

// Flow Types
declare interface FlowType {
  nodeTypes: Record<string, CustomNode>;
  edgeTypes: Record<string, CustomEdge>;
}

// OpenAI lib
declare interface ModelMessagesParams {
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
  year: string;
}

// Fields
declare interface ArtifactSelectItem {
  id: string;
  type: string;
  label: string;
  description?: string;
  icon?: string;
}

declare interface ArtifactSelectorWithSection {
  id: string;
  section: string;
  items: ArtifactSelectItem[];
}

// Forms
declare interface UserPreferencesParams {
  companyId: string | null;
  companyName: string | null;
  teamId: string | null;
  teamName: string | null;
}

declare interface RegisterParams {
  name: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

declare interface LoginParams {
  email: string;
  password: string;
}

declare interface ForgotPasswordParams {
  email: string;
}

declare interface ResetPasswordParams {
  password: string;
  confirmPassword: string;
  userId: string;
  secret: string;
}

declare interface CreateCompanyParams {
  id?: string;
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
}

declare interface CreateArtifactParams {
  name: string;
  description: string;
  yearProjection: number;
  type: ArtifactType;
  data: string;
}

declare interface GenerateArtifactParams {
  year: number;
  companyId: string;
  type: ArtifactType;
}
