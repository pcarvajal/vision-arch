'server-only';

import { IBaseCustomData } from '@/types/reactflow';
import { IArtifactConfig } from '..';
import {
  ArtifactCategoryEnum,
  ArtifactDimensionEnum,
  ArtifacTypeEnum,
  CustomNodeTypeEnum,
} from './enum';

// Roles
export const roles = ['owner', 'admin', 'user'] as const;

// Proyections
export const yearRange = {
  min: 2024,
  max: 2028,
  default: 2024,
};

// Nodes
const sharedNodeData: IBaseCustomData[] = [
  {
    name: 'noteNode',
    type: {
      id: CustomNodeTypeEnum.note,
    },
    icon: 'notebook-pen',
    iconColor: '#16a34a',
    label: 'Nota',
    borderColor: '#475569',
  },
  {
    name: 'basicNode',
    type: {
      id: CustomNodeTypeEnum.titleAndDescription,
    },
    label: 'Básico',
    icon: 'ruler',
    iconColor: '#475569',
    borderColor: '#475569',
  },
];
// Node Custom Data
export const goalsNodeData: IBaseCustomData[] = [
  ...sharedNodeData,
  {
    name: 'objetiveNode',
    type: {
      id: CustomNodeTypeEnum.titleAndDescription,
    },
    icon: 'diamond-plus',
    iconColor: '#16a34a',
    label: 'Objetivo',
    borderColor: '#16a34a',
  },
  {
    name: 'problemNode',
    type: {
      id: CustomNodeTypeEnum.titleAndDescription,
    },
    label: 'Problema',
    icon: 'octagon-alert',
    iconColor: '#dc2626',
    borderColor: '#dc2626',
  },
  {
    name: 'conceptNode',
    type: {
      id: CustomNodeTypeEnum.titleAndDescription,
    },
    label: 'Concepto',
    icon: 'square-dashed-kanban',
    iconColor: '#9333ea',
    borderColor: '#9333ea',
  },
  {
    name: 'featureNode',
    type: {
      id: CustomNodeTypeEnum.titleAndDescription,
    },
    label: 'Característica',
    icon: 'package-plus',
    iconColor: '#ca8a04',
    borderColor: '#ca8a04',
  },
];
// Blueprints Nodes
export const blueprintsNodeData: IBaseCustomData[] = [
  ...sharedNodeData,
  {
    name: 'actorNode',
    type: {
      id: CustomNodeTypeEnum.titleAndIcon,
    },
    label: 'Actor',
    color: '#f8fafc',
    backgroundColor: '#fcd34d',
    icon: 'diamond-plus',
    iconColor: '#16a34a',
  },
  {
    name: 'systemNode',
    type: {
      id: CustomNodeTypeEnum.title,
    },
    label: 'Sistema',
    color: '#f8fafc',
    backgroundColor: '#f0abfc',
    icon: 'octagon-alert',
    iconColor: '#dc2626',
  },
  {
    name: 'processNode',
    type: {
      id: CustomNodeTypeEnum.title,
    },
    label: 'Proceso',
    color: '#f8fafc',
    backgroundColor: '#a78bfa',
    icon: 'square-dashed-kanban',
    iconColor: '#9333ea',
  },
  {
    name: 'dataNode',
    type: {
      id: CustomNodeTypeEnum.title,
    },
    label: 'Dato',
    color: '#475569',
    backgroundColor: '#f8fafc',
    icon: 'package-plus',
    iconColor: '#ca8a04',
  },
  {
    name: 'infrastructureNode',
    type: {
      id: CustomNodeTypeEnum.title,
    },
    label: 'Infraestructura',
    color: '#f8fafc',
    backgroundColor: '#f9a8d4',
    icon: 'ruler',
    iconColor: '#475569',
  },
];

// CSVLOD : Policies Nodes HAsta aca
export const policiesNodeData: IBaseCustomData[] = [
  ...sharedNodeData,
  {
    name: 'policyTypeAreaNode',
    type: { id: CustomNodeTypeEnum.area },
    label: 'Área tipo de política',
    color: '#0ea5e9',
    borderColor: '#0c4a6e',
    icon: 'scan',
  },
  {
    name: 'policyAreaNode',
    type: { id: CustomNodeTypeEnum.area },
    label: 'Área política',
    color: '#eab308',
    borderColor: '#713f12',
    icon: 'scan',
  },
  {
    name: 'policyDescriptionAreaNode',
    type: { id: CustomNodeTypeEnum.area },
    label: 'Área descripción de la política',
    color: '#a855f7',
    borderColor: '#581c87',
    icon: 'scan',
  },
  {
    name: 'policyTypeLabelNode',
    type: { id: CustomNodeTypeEnum.title },
    label: 'Bloque tipo de política',
    icon: 'text',
  },
  {
    name: 'policyTextBlockNode',
    type: { id: CustomNodeTypeEnum.textBlock },
    customNode: CustomNodeTypeEnum.textBlock,
    label: 'Bloque titulo de política',
    icon: 'text',
  },
  {
    name: 'policyDescriptionTextBlockNode',
    type: { id: CustomNodeTypeEnum.textBlock },
    label: 'Bloque descripción de política',
    icon: 'text',
  },
];
// CSVLOD: Principles Nodes
export const principlesNodeData: IBaseCustomData[] = [
  {
    name: 'principleTitleAndItemsNode',
    type: { id: CustomNodeTypeEnum.title },
    label: 'Bloque de texto de principio',
    color: '#0ea5e9',
    borderColor: '#0c4a6e',
    icon: 'text',
  },
];
// CSVLOD: Guidelines
export const guidelinesNodeData: IBaseCustomData[] = [
  {
    name: 'standardAreaNode',
    type: { id: CustomNodeTypeEnum.area },
    label: 'Área de estandard',
    color: '#0ea5e9',
    borderColor: '#0c4a6e',
    icon: 'scan',
  },
  {
    name: 'guidelineAreaNode',
    type: { id: CustomNodeTypeEnum.area },
    label: 'Área de pauta',
    color: '#0ea5e9',
    borderColor: '#0c4a6e',
    icon: 'scan',
  },
  {
    name: 'standardTextBlockNode',
    type: { id: CustomNodeTypeEnum.textBlock },
    label: 'Bloque de texto de estandard',
    color: '#a855f7',
    borderColor: '#581c87',
    icon: 'text',
  },
  {
    name: 'guidelineTextBlockNode',
    type: { id: CustomNodeTypeEnum.textBlock },
    label: 'Bloque de texto de pauta',
    color: '#a855f7',
    borderColor: '#581c87',
    icon: 'text',
  },
];

// Artifacts
export const goalsArtifactConfig: IArtifactConfig = {
  name: ArtifacTypeEnum.goals,
  label: 'Metas',
  category: {
    name: ArtifactCategoryEnum.objetives,
    label: 'Objetivos',
  },
  presets: goalsNodeData,
};

export const blueprintsArtifactConfig: IArtifactConfig = {
  name: ArtifacTypeEnum.blueprints,
  label: 'Conceptos',
  category: {
    name: ArtifactCategoryEnum.togaf,
    label: 'TOGAF',
  },
  presets: blueprintsNodeData,
};

export const guidelinesArtifactConfig: IArtifactConfig = {
  name: ArtifacTypeEnum.guidelines,
  label: 'Principios',
  category: {
    name: ArtifactCategoryEnum.csvlod,
    label: 'CSVLOD',
  },
  presets: guidelinesNodeData,
};

export const policiesArtifactConfig: IArtifactConfig = {
  name: ArtifacTypeEnum.policies,
  label: 'Políticas',
  category: {
    name: ArtifactCategoryEnum.csvlod,
    label: 'CSVLOD',
  },
  presets: policiesNodeData,
};

export const principlesArtifactConfig: IArtifactConfig = {
  name: ArtifacTypeEnum.principles,
  label: 'Principios',
  category: {
    name: ArtifactCategoryEnum.csvlod,
    label: 'CSVLOD',
  },
  presets: principlesNodeData,
};
