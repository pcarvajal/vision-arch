// Appwrite Types

import { Edge, Node, ReactFlowJsonObject, Viewport } from '@xyflow/react';
import { Models } from 'node-appwrite';

export type ArtifactTypes = 'goals' | 'business';

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
export interface ArtifactObject {
  data: ReactFlowJsonObject;
  year: number;
  type: string;
}
