import { ReactFlowJsonObject } from '@xyflow/react';
import { Artifact } from './types';

// App
declare type OptionalObject<T extends Record<string, any>> =
  | T
  | { [K in keyof T]?: never };
declare type Role = 'owner' | 'admin' | 'user';
declare type UIColors =
  | 'foreground'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | undefined;

// Stores
declare type ArtifactFlowDataStore = {
  data: ReactFlowJsonObject;
  year: number;
  type: ArtifactType;
  details: { name: string; category: string } | null;
};

// Custom nodes (RF12)
declare type CustomNodeData = {
  id: string;
  type: string;
  label: string | undefined;
  width: number | undefined;
  height: number | undefined;
  color: string | undefined;
  borderColor: string | undefined;
  backgroundColor: string | undefined;
  zIndex: number | undefined;
  customData?: {
    [key: string]: any;
  };
  parentId?: string;
  extent?: string;
};

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

// OpenAI lib
declare type ModelMessagesParams = {
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
  year: string;
};

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
