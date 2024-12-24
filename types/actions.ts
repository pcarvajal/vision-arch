import { ICompany, IUser } from './appwrite';

export interface IResponse {
  code: number;
  message: string;
  type: 'error' | 'warning' | 'info';
}

// Errors
export const UNHANDLED_ERROR = {
  code: -100,
  message: 'Ha ocurrido un error inesperado',
  type: 'error' as const,
};

export const DOCUMENT_NOT_FOUND = {
  code: 100,
  message: 'No se encontró el documento',
  type: 'error' as const,
};

export interface IActionResponse<T> {
  data: T | null;
  response?: IResponse;
}

// Auth
export interface ILoginActionResponse {
  user: IUser;
  company: ICompany | null;
}
