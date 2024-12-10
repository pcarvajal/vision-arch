import { CoordinateExtent, ReactFlowJsonObject } from '@xyflow/react';
import { Models } from 'node-appwrite';
import { ArtifactType } from '.';

// App
export interface User {
  id?: string | undefined;
  name: string;
  email: string;
  companyId: string;
  companyName: string;
  teamId: string;
  teamName: string;
  avatar: string | undefined;
}

export interface Company {
  id?: string | undefined;
  name: string;
  description: string;
  mission: string;
  vision: string;
  objetives: string;
}

export interface Artifact {
  id?: string | undefined;
  name: string;
  userId: string;
  companyId: string;
  type: ArtifactType;
  description: string;
  data: string;
  yearProjection: number;
  createdBy: string;
}

// Appwrite
export interface UserModel extends User, Models.Document {}
export interface CompanyModel extends Company, Models.Document {}
export interface ArtifactModel extends Artifact, Models.Document {}
export interface Account extends Models.User<Models.Preferences> {}
export interface Preferences extends Models.Preferences {}

// React Flow
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
