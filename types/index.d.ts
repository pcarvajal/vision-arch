declare type UIColors =
  | 'foreground'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | undefined;
declare type OptionalObject<T extends Record<string, any>> = T | { [K in keyof T]?: never };
