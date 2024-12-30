// Custom nodes data
export interface IBaseCustomNode {
  id: string;
}

export interface IBaseCustomData extends Record<string, unknown> {
  name: string;
  label: string;
  type: IBaseCustomNode;
  description?: string;
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
  icon?: string;
  iconColor?: string;
}

export interface IAreaNodeProps extends IBaseCustomData {
  title: string;
}

export interface INoteNodeProps extends IBaseCustomData {
  title: string;
  description: string;
}

export interface ITextBlockNodeProps extends IBaseCustomData {
  textBlock: string;
  placeholder: string;
}

export interface ITitleAndItemsNodeProps extends IBaseCustomData {
  title: string;
  description: string;
  items: {
    id: string;
    title: string;
    type: 'TextArea' | 'Input';
    value: string;
  }[];
}

export interface ITitleDescriptionNodeProps extends IBaseCustomData {
  title: string;
  titlePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
}

export interface ITitleIconNodeProps extends IBaseCustomData {
  title: string;
  titlePlaceholder: string;
  figure: string;
}

export interface ITitleNodeProps extends IBaseCustomData {
  title: string;
  placeholder: string;
}

export interface IVerticalTitleNodeProps extends IBaseCustomData {
  title: string;
  placeholder: string;
}
