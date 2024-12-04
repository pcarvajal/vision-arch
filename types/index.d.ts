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
declare type GoalsNodeTypes =
  | 'objetiveNode'
  | 'problemNode'
  | 'conceptNode'
  | 'featureNode'
  | 'basicNode';
declare type BlueprintNodeTypes = 'actorsNode';

declare type GoalsNodeData = {
  title?: string;
  description?: string;
  borderColor?: string;
};

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

declare interface GenerateCompanyObjetivesParams {
  year: number;
  companyId: string;
}

declare interface ResetPasswordParams {
  password: string;
  confirmPassword: string;
  userId: string;
  secret: string;
}
