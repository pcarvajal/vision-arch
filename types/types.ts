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
