// Appwrite Types

import { CoordinateExtent, ReactFlowJsonObject } from '@xyflow/react';
import { Models } from 'node-appwrite';

export type ArtifactTypes =
  | 'goals'
  | 'blueprints'
  | 'policies'
  | 'principles'
  | 'guidelines';

export interface Account extends Models.User<Models.Preferences> {}

export interface User extends Models.Document {
  id: string | undefined;
  name: string;
  email: string;
  companyId: string;
  companyName: string;
  teamId: string;
  teamName: string;
  avatar: string | undefined;
}

export interface Company extends Models.Document {
  id: string | undefined;
  name: string;
  description: string;
  mission: string;
  vision: string;
  objetives: string;
}

export interface Artifact extends Models.Document {
  id: string | undefined;
  name: string;
  userId: string;
  companyId: string;
  type: ArtifactTypes;
  description: string;
  data: string;
  yearProjection: number;
  createdBy: string;
}

// React Flow

export interface FlowData {
  year: number;
  type: string;
  details?: { name: string; category: string };
}

export interface ArtifactFlowData {
  data: ReactFlowJsonObject | null;
}

export interface CustomNode {
  id: string;
  type: string;
  label?: string;
  width?: number;
  height?: number;
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
  icon?: React.ComponentType<{ className?: string }> | undefined;
  iconColor?: string;
  zIndex?: number;
  parentId?: string;
  extent?: 'parent' | CoordinateExtent;
  position: {
    x: number;
    y: number;
  };
  customData?: {
    [key: string]: any;
  };
}

// Forms

export interface ArtifactSelectorItem {
  type: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }> | undefined;
  description?: string;
}

export interface ArtifactSelectorWithSections {
  section: string;
  items: ArtifactSelectorItem[];
}

// OpenAI
export interface ModelMessagesProps {
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
  year: string;
}
