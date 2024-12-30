import { TArtifactType } from '..';

export interface IUserPreferencesParams {
  companyId: string | null;
  companyName: string | null;
  teamId: string | null;
  teamName: string | null;
}

export interface IRegisterParams {
  name: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IForgotPasswordParams {
  email: string;
}

export interface IResetPasswordParams {
  password: string;
  confirmPassword: string;
  userId: string;
  secret: string;
}

export interface ICreateCompanyParams {
  id?: string;
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
}

export interface ICreateArtifactParams {
  name: string;
  description: string;
  yearProjection: number;
  type: TArtifactType;
  data: string;
}

export interface IGenerateArtifactParams {
  year: number;
  companyId: string;
  type: TArtifactType;
}

export interface IModelMessagesParams {
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
  year: string;
}
