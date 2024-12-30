import {
  IAccountModel,
  IArtifact,
  ICompany,
  IUser,
  IUserModel,
} from './appwrite';

// Base response
export interface IResponse {
  code: number;
  message: string;
  type: 'error' | 'warning' | 'info';
  error?: any;
}

export interface IActionResponse<T = unknown> {
  data: T | null;
  response?: IResponse;
}

// Specific responses
export interface ILoginActionResponse {
  user: IUser | null;
  account: IAccountModel;
  company: ICompany | null;
}

export interface IGetArtifactsResponse {
  artifacts: IArtifact[];
  total: number;
}

export interface IGetArtifactResponse {
  artifact: IArtifact;
}

export interface IGetCompanyResponse {
  company: ICompany;
}

export interface ICreateCompanyResponse {
  company: ICompany;
  user: IUser;
}

export interface IGenerateModelResponse {
  model: string;
}

export interface IGetUserResponse {
  user: IUser;
}
