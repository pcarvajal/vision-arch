import { ReactFlowJsonObject } from '@xyflow/react';

// App
declare type Role = 'owner' | 'admin' | 'user';
declare type UIColors =
  | 'foreground'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | undefined;

// React Flow
declare type GoalsNodeData = {
  title?: string;
  description?: string;
  borderColor?: string;
};
declare type GoalsNodeTypes =
  | 'objetiveNode'
  | 'problemNode'
  | 'conceptNode'
  | 'featureNode'
  | 'basicNode';
declare type BlueprintsNodeData = {
  backgroundColor?: string;
  height?: number;
  label?: string;
  placeholder?: string;
  textColor?: string;
  type: BlueprintNodeTypes;
  width?: number;
};
declare type BlueprintNodeTypes =
  | 'actorNode'
  | 'systemNode'
  | 'processNode'
  | 'dataNode'
  | 'infrastructureNode'
  | 'subflowNode';

declare type OptionalObject<T extends Record<string, any>> =
  | T
  | { [K in keyof T]?: never };

declare interface NodeProps<T> {
  data: T;
  id: string;
}

// Forms
declare interface CreateArtifactParams {
  name: string;
  description: string;
  yearProjection: number;
  type: string;
  data: string;
}

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

declare interface CreateCompanyParams {
  id?: string;
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
}

declare interface GenerateArtifactParams {
  year: number;
  companyId: string;
}

declare interface ResetPasswordParams {
  password: string;
  confirmPassword: string;
  userId: string;
  secret: string;
}
