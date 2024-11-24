declare type UIColors =
  | 'foreground'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | undefined;
declare type OptionalObject<T extends Record<string, any>> = T | { [K in keyof T]?: never };

// Forms
declare interface CreateCompanyParams {
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
