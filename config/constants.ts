'server-only';

import { CustomNodeData } from '@/types';

// Roles
export const roles = ['owner', 'admin', 'user'] as const;

// Proyections
export const yearRange = {
  min: 2024,
  max: 2028,
  default: 2024,
};

// Nodes
const sharedNodesData: CustomNodeData[] = [
  {
    type: 'noteNode',
    nodeData: {
      text: undefined,
    },
    icon: 'notebook-pen',
    iconColor: '#16a34a',
    label: 'Nota',
    category: 'shared',
    categoryLabel: 'Compartidos',
    borderColor: '#475569',
    width: 200,
    height: 50,
  },
];
// Goals
export const goalsNodes: CustomNodeData[] = [
  ...sharedNodesData,
  {
    type: 'objetiveNode',
    nodeData: {
      title: '',
      description: '',
    },
    icon: 'diamond-plus',
    iconColor: '#16a34a',
    label: 'Objetivo',
    category: 'objetives',
    categoryLabel: 'Objetivos',
    borderColor: '#16a34a',
  },
  {
    type: 'problemNode',
    nodeData: {
      title: '',
      description: '',
    },
    label: 'Problema',
    icon: 'octagon-alert',
    iconColor: '#dc2626',
    category: 'objetives',
    categoryLabel: 'Objetivos',
    borderColor: '#dc2626',
  },
  {
    type: 'conceptNode',
    nodeData: {
      title: '',
      description: '',
    },
    label: 'Concepto',
    category: 'objetives',
    categoryLabel: 'Objetivos',
    icon: 'square-dashed-kanban',
    iconColor: '#9333ea',
    borderColor: '#9333ea',
  },
  {
    type: 'featureNode',
    nodeData: {
      title: '',
      description: '',
    },
    category: 'objetives',
    categoryLabel: 'Objetivos',
    label: 'Característica',
    icon: 'package-plus',
    iconColor: '#ca8a04',
    borderColor: '#ca8a04',
  },
  {
    type: 'basicNode',
    nodeData: {
      title: '',
      description: '',
    },
    category: 'objetives',
    categoryLabel: 'Objetivos',
    label: 'Básico',
    icon: 'ruler',
    iconColor: '#475569',
    borderColor: '#475569',
  },
];
// Blueprints
export const blueprintsNodes: CustomNodeData[] = [
  ...sharedNodesData,
  {
    type: 'actorNode',
    nodeData: {
      titlePlaceholder: 'Ingresa un actor ...',
    },
    category: 'togaf',
    categoryLabel: 'TOGAF',
    label: 'Actor',
    color: '#f8fafc',
    backgroundColor: '#fcd34d',
    icon: 'diamond-plus',
    iconColor: '#16a34a',
    width: 200,
    height: 100,
  },
  {
    type: 'systemNode',
    nodeData: {
      titlePlaceholder: 'Ingresa un sistema ...',
    },
    category: 'togaf',
    categoryLabel: 'TOGAF',
    label: 'Sistema',
    color: '#f8fafc',
    backgroundColor: '#f0abfc',
    icon: 'octagon-alert',
    iconColor: '#dc2626',
    width: 200,
    height: 100,
  },
  {
    type: 'processNode',
    nodeData: {
      titlePlaceholder: 'Ingresa un proceso ...',
    },
    category: 'togaf',
    categoryLabel: 'TOGAF',
    label: 'Proceso',
    color: '#f8fafc',
    backgroundColor: '#a78bfa',
    icon: 'square-dashed-kanban',
    iconColor: '#9333ea',
    width: 200,
    height: 100,
  },
  {
    type: 'dataNode',

    nodeData: {
      titlePlaceholder: 'Ingresa una fuente de datos ...',
    },
    category: 'togaf',
    categoryLabel: 'TOGAF',
    label: 'Dato',
    color: '#475569',
    backgroundColor: '#f8fafc',
    icon: 'package-plus',
    iconColor: '#ca8a04',
    width: 200,
    height: 100,
  },
  {
    type: 'infrastructureNode',

    nodeData: {
      titlePlaceholder: 'Ingresa una componente de infraestructura ...',
    },
    category: 'togaf',
    categoryLabel: 'TOGAF',
    label: 'Infraestructura',
    color: '#f8fafc',
    backgroundColor: '#f9a8d4',
    icon: 'ruler',
    iconColor: '#475569',
    width: 200,
    height: 100,
  },
];

// CSVLOD : Policies
export const csvlodPoliciesNodes: CustomNodeData[] = [
  ...sharedNodesData,
  {
    type: 'policyTypeAreaNode',
    nodeData: {
      title: 'Tipo de política',
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'policies',
    subcategoryLabel: 'Políticas',
    label: 'Área tipo de política',
    width: 100,
    height: 250,
    color: '#0ea5e9',
    borderColor: '#0c4a6e',
    zIndex: 900,
    icon: 'scan',
  },
  {
    type: 'policyAreaNode',
    nodeData: {
      title: 'Política',
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'policies',
    subcategoryLabel: 'Políticas',
    label: 'Área política',
    width: 140,
    height: 250,
    color: '#eab308',
    borderColor: '#713f12',
    zIndex: 900,
    icon: 'scan',
  },
  {
    type: 'policyDescriptionAreaNode',
    nodeData: {
      title: 'Descripción',
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'policies',
    subcategoryLabel: 'Políticas',
    label: 'Área descripción de la política',
    width: 600,
    height: 250,
    color: '#a855f7',
    borderColor: '#581c87',
    zIndex: 900,
    icon: 'scan',
  },
  {
    type: 'policyTypeLabelNode',
    nodeData: {
      title: 'Tipo de política',
      titlePlaceholder: 'Ingresa un tipo de política ...',
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'policies',
    subcategoryLabel: 'Políticas',
    label: 'Bloque tipo de política',
    width: 88,
    height: 193,
    zIndex: undefined,
    icon: 'text',
  },
  {
    type: 'policyTextBlockNode',
    nodeData: {
      textBlock: 'Política',
      textBlockPlaceholder: 'Ingresa una política ...',
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'policies',
    subcategoryLabel: 'Políticas',
    label: 'Bloque titulo de política',
    width: 110,
    height: 80,
    icon: 'text',
  },
  {
    type: 'policyDescriptionTextBlockNode',
    nodeData: {
      textBlock: 'Descripción de la política',
      textBlockPlaceholder: 'Ingresa una descripción de la política ...',
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'policies',
    subcategoryLabel: 'Políticas',
    label: 'Bloque descripción de política',
    width: 240,
    height: 80,
    icon: 'text',
  },
];
// CSVLOD: Principles
export const csvlodPrinciplesNodes: CustomNodeData[] = [
  ...sharedNodesData,
  {
    type: 'principleTitleAndItemsNode',
    nodeData: {
      title: 'Titulo del principio',
      titlePlaceholder: 'Ingresa un título ...',
      description: 'Descripción del principio ...',
      descriptionPlaceholder: 'Ingresa una descripción ...',
      items: [
        {
          id: '1',
          title: 'Declaración',
          type: 'TextArea',
          value: 'Descripciones de la declaración ...',
        },
        {
          id: '2',
          title: 'Razón',
          type: 'TextArea',
          value: 'Descripciones de la razón ...',
        },
        {
          id: '3',
          title: 'Implicaciones',
          type: 'TextArea',
          value: 'Descripciones de las implicaciones ...',
        },
      ],
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'principles',
    subcategoryLabel: 'Principios',
    label: 'Bloque de texto de principio',
    width: 100,
    height: 250,
    color: '#0ea5e9',
    borderColor: '#0c4a6e',
    zIndex: 900,
    icon: 'text',
  },
];
// CSVLOD: Guidelines
export const csvlodGuidelinesNodes: CustomNodeData[] = [
  ...sharedNodesData,
  {
    type: 'standardAreaNode',
    nodeData: {
      title: 'Estandard',
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'guidelines',
    subcategoryLabel: 'Estándares',
    label: 'Área de estandard',
    width: 100,
    height: 250,
    color: '#0ea5e9',
    borderColor: '#0c4a6e',
    zIndex: 900,
    icon: 'scan',
  },
  {
    type: 'guidelineAreaNode',
    nodeData: {
      title: 'Pauta',
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'guidelines',
    subcategoryLabel: 'Estándares',
    label: 'Área de pauta',
    width: 100,
    height: 250,
    color: '#0ea5e9',
    borderColor: '#0c4a6e',
    zIndex: 900,
    icon: 'scan',
  },
  {
    type: 'standardTextBlockNode',
    nodeData: {
      textBlock: 'Política 1: Descripción de la política ...',
      textBlockPlaceholder: 'Ingresa una descripción de la política ...',
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'guidelines',
    subcategoryLabel: 'Estándares',
    label: 'Bloque de texto de estandard',
    width: 600,
    height: 250,
    color: '#a855f7',
    borderColor: '#581c87',
    zIndex: 900,
    icon: 'text',
  },
  {
    type: 'guidelineTextBlockNode',
    nodeData: {
      textBlock: 'Pauta 1: Descripción de la pauta ...',
      textBlockPlaceholder: 'Ingresa una descripción de la pauta ...',
    },
    category: 'csvlod',
    categoryLabel: 'CSVLOD',
    subcategory: 'guidelines',
    subcategoryLabel: 'Estándares',
    label: 'Bloque de texto de pauta',
    width: 600,
    height: 250,
    color: '#a855f7',
    borderColor: '#581c87',
    zIndex: 900,
    icon: 'text',
  },
];
