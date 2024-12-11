import { CustomNode } from '@/types';
import { ReactFlowJsonObject } from '@xyflow/react';
import { Artifact } from './types';

// App
declare type Role = 'owner' | 'admin' | 'user';
declare type ArtifactCategory = 'csvlod' | 'objetives' | 'togaf';
declare type ArtifactType =
  | 'goals'
  | 'blueprints'
  | 'policies'
  | 'principles'
  | 'guidelines';
declare type GoalsNodeType =
  | 'objetiveNode'
  | 'problemNode'
  | 'conceptNode'
  | 'featureNode'
  | 'basicNode';
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
declare type CustomNodeType =
  | GoalsNodeType
  | BlueprintNodeType
  | CsvlodPoliciesNodeType
  | CsvlodPrinciplesNodeType
  | CsvlodGuidelinesNodeType;

// Custom nodes (RF12)
declare interface CustomNode<T = unknown> {
  id?: string;
  type: CustomNodeType;
  position?: { x: number; y: number };
  data: CustomNodeData<T>;
}

declare interface CustomNodeData<T = unknown> {
  label: string;
  category: ArtifactCategory;
  categoryLabel: string;
  subcategory?: string;
  subcategoryLabel?: string;
  description?: string;
  width?: number;
  height?: number;
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
  zIndex?: number;
  icon?: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  nodeData: T;
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
  type: ArtifactType;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

declare interface ArtifactSelectorWithSection {
  section: string;
  items: ArtifactItem[];
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
