import { Models } from 'node-appwrite';
import { TArtifactType } from '..';

export interface IUser {
  id?: string | undefined;
  name: string;
  email: string;
  companyId: string;
  companyName: string;
  teamId: string;
  teamName: string;
  avatar: string | undefined;
}

export interface ICompany {
  id?: string | undefined;
  name: string;
  description: string;
  mission: string;
  vision: string;
  objetives: string;
}

export interface IArtifact {
  id?: string | undefined;
  name: string;
  userId: string;
  companyId: string;
  type: TArtifactType;
  description: string;
  data: string;
  yearProjection: number;
  createdBy: string;
}

export interface IUserModel extends IUser, Models.Document {}
export interface ICompanyModel extends ICompany, Models.Document {}
export interface IArtifactModel extends IArtifact, Models.Document {}
export interface IAccountModel extends Models.User<Models.Preferences> {}
export interface IPreferences extends Models.Preferences {}
