import { Edge, Node, Viewport } from '@xyflow/react';

declare type TRole = 'owner' | 'admin' | 'user';
declare type TArtifactCategory = 'csvlod' | 'togaf' | 'objetives';
declare type TArtifactType =
  | 'goals'
  | 'blueprints'
  | 'policies'
  | 'principles'
  | 'guidelines';
declare type TArtifactDimension = 'considerations' | 'standards';

declare interface IFlow {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
}

declare interface IArtifactConfig {
  id?: string;
  name: TArtifactType;
  label: string;
  category: {
    name: TArtifactCategory;
    label: string;
  };
  presets: IBaseCustomData[];
  initialFlow?: {
    nodes: Node[];
    edges: Edge[];
    viewport: Viewport;
  };
}

declare interface IFlowType {
  nodeTypes: Record<
    string,
    ComponentType<NodeProps & { data: any; type: any }>
  >;
  edgeTypes: Record<
    string,
    ComponentType<EdgeProps & { data: any; type: any }>
  >;
}
