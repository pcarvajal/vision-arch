import { IArtifact, ICompany, IUser } from './appwrite';

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
  user: IUser;
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

export interface IGenerateModelResponse {
  model: string;
}
