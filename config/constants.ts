'server-only';

import {
  ArtifactProps,
  ArtifactSelectorWithSection,
  GenericNodeProps,
} from '@/types';
import {
  ArtifactCategoryEnum,
  ArtifactDimensionEnum,
  ArtifacTypeEnum,
  BaseNodeTypeEnum,
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
const sharedNodesData = [
  {
    type: 'noteNode',
    nodeData: {
      text: undefined,
    },
    nodeBaseType: BaseNodeTypeEnum.AREA,
    icon: 'notebook-pen',
    iconColor: '#16a34a',
    label: 'Nota',
    category: 'shared',
    categoryLabel: 'Compartidos',
    borderColor: '#475569',
    width: 200,
    height: 50,
  },
  {
    type: 'basicNode',
    nodeData: {
      title: '',
      description: '',
    },
    nodeBaseType: BaseNodeTypeEnum.TITLE_DESCRIPTION,
    category: 'objetives',
    categoryLabel: 'Objetivos',
    label: 'Básico',
    icon: 'ruler',
    iconColor: '#475569',
    borderColor: '#475569',
  },
];
// Goals Nodes
export const goalsNodes: GenericNodeProps[] = [
  {
    node: {
      type: 'objetiveNode',
      nodeData: {
        title: '',
        description: '',
      },
      nodeBaseType: BaseNodeTypeEnum.TITLE_DESCRIPTION,
      icon: 'diamond-plus',
      iconColor: '#16a34a',
      label: 'Objetivo',
      borderColor: '#16a34a',
    },
  },
  {
    node: {
      type: 'problemNode',
      nodeData: {
        title: '',
        description: '',
      },
      nodeBaseType: BaseNodeTypeEnum.TITLE_DESCRIPTION,
      label: 'Problema',
      icon: 'octagon-alert',
      iconColor: '#dc2626',
      borderColor: '#dc2626',
    },
  },
  {
    node: {
      type: 'conceptNode',
      nodeData: {
        title: '',
        description: '',
      },
      nodeBaseType: BaseNodeTypeEnum.TITLE_DESCRIPTION,
      label: 'Concepto',
      icon: 'square-dashed-kanban',
      iconColor: '#9333ea',
      borderColor: '#9333ea',
    },
  },
  {
    node: {
      type: 'featureNode',
      nodeData: {
        title: '',
        description: '',
      },
      nodeBaseType: BaseNodeTypeEnum.TITLE_DESCRIPTION,
      label: 'Característica',
      icon: 'package-plus',
      iconColor: '#ca8a04',
      borderColor: '#ca8a04',
    },
  },
];
// Blueprints Nodes
export const blueprintsNodes: GenericNodeProps[] = [
  {
    node: {
      type: 'actorNode',
      nodeData: {
        titlePlaceholder: 'Ingresa un actor ...',
      },
      nodeBaseType: BaseNodeTypeEnum.TITLE_ICON,
      label: 'Actor',
      color: '#f8fafc',
      backgroundColor: '#fcd34d',
      icon: 'diamond-plus',
      iconColor: '#16a34a',
      width: 200,
      height: 100,
    },
  },
  {
    node: {
      type: 'systemNode',
      nodeData: {
        titlePlaceholder: 'Ingresa un sistema ...',
      },
      nodeBaseType: BaseNodeTypeEnum.TITLE,
      label: 'Sistema',
      color: '#f8fafc',
      backgroundColor: '#f0abfc',
      icon: 'octagon-alert',
      iconColor: '#dc2626',
      width: 200,
      height: 100,
    },
  },
  {
    node: {
      type: 'processNode',
      nodeData: {
        titlePlaceholder: 'Ingresa un proceso ...',
      },
      nodeBaseType: BaseNodeTypeEnum.TITLE,
      label: 'Proceso',
      color: '#f8fafc',
      backgroundColor: '#a78bfa',
      icon: 'square-dashed-kanban',
      iconColor: '#9333ea',
      width: 200,
      height: 100,
    },
  },
  {
    node: {
      type: 'dataNode',
      nodeData: {
        titlePlaceholder: 'Ingresa una fuente de datos ...',
      },
      nodeBaseType: BaseNodeTypeEnum.TITLE,
      label: 'Dato',
      color: '#475569',
      backgroundColor: '#f8fafc',
      icon: 'package-plus',
      iconColor: '#ca8a04',
      width: 200,
      height: 100,
    },
  },
  {
    node: {
      type: 'infrastructureNode',
      nodeData: {
        titlePlaceholder: 'Ingresa una componente de infraestructura ...',
      },
      nodeBaseType: BaseNodeTypeEnum.TITLE,
      label: 'Infraestructura',
      color: '#f8fafc',
      backgroundColor: '#f9a8d4',
      icon: 'ruler',
      iconColor: '#475569',
      width: 200,
      height: 100,
    },
  },
];

// CSVLOD : Policies Nodes HAsta aca
export const csvlodPoliciesNodes: GenericNodeProps[] = [
  {
    node: {
      type: 'policyTypeAreaNode',
      nodeData: {
        title: 'Tipo de política',
      },
      nodeBaseType: BaseNodeTypeEnum.AREA,
      label: 'Área tipo de política',
      width: 100,
      height: 250,
      color: '#0ea5e9',
      borderColor: '#0c4a6e',
      zIndex: 900,
      icon: 'scan',
    },
  },
  {
    node: {
      type: 'policyAreaNode',
      nodeData: {
        title: 'Política',
      },
      nodeBaseType: BaseNodeTypeEnum.AREA,
      label: 'Área política',
      width: 140,
      height: 250,
      color: '#eab308',
      borderColor: '#713f12',
      zIndex: 900,
      icon: 'scan',
    },
  },
  {
    node: {
      type: 'policyDescriptionAreaNode',
      nodeData: {
        title: 'Descripción',
      },
      nodeBaseType: BaseNodeTypeEnum.AREA,
      label: 'Área descripción de la política',
      width: 600,
      height: 250,
      color: '#a855f7',
      borderColor: '#581c87',
      zIndex: 900,
      icon: 'scan',
    },
  },
  {
    node: {
      type: 'policyTypeLabelNode',
      nodeData: {
        title: 'Tipo de política',
        titlePlaceholder: 'Ingresa un tipo de política ...',
      },
      nodeBaseType: BaseNodeTypeEnum.TITLE,
      label: 'Bloque tipo de política',
      width: 88,
      height: 193,
      zIndex: undefined,
      icon: 'text',
    },
  },
  {
    node: {
      type: 'policyTextBlockNode',
      nodeData: {
        textBlock: 'Política',
        textBlockPlaceholder: 'Ingresa una política ...',
      },
      nodeBaseType: BaseNodeTypeEnum.TEXT_BLOCK,
      label: 'Bloque titulo de política',
      width: 110,
      height: 80,
      icon: 'text',
    },
  },
  {
    node: {
      type: 'policyDescriptionTextBlockNode',
      nodeData: {
        textBlock: 'Descripción de la política',
        textBlockPlaceholder: 'Ingresa una descripción de la política ...',
      },
      nodeBaseType: BaseNodeTypeEnum.TEXT_BLOCK,
      label: 'Bloque descripción de política',
      width: 240,
      height: 80,
      icon: 'text',
    },
  },
];
// CSVLOD: Principles Nodes
export const csvlodPrinciplesNodes: GenericNodeProps[] = [
  {
    node: {
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
      nodeBaseType: BaseNodeTypeEnum.TITLE_AND_ITEMS,
      label: 'Bloque de texto de principio',
      width: 100,
      height: 250,
      color: '#0ea5e9',
      borderColor: '#0c4a6e',
      zIndex: 900,
      icon: 'text',
    },
  },
];
// CSVLOD: Guidelines
export const csvlodGuidelinesNodes: GenericNodeProps[] = [
  {
    node: {
      type: 'standardAreaNode',
      nodeData: {
        title: 'Estandard',
      },
      nodeBaseType: BaseNodeTypeEnum.AREA,
      label: 'Área de estandard',
      width: 100,
      height: 250,
      color: '#0ea5e9',
      borderColor: '#0c4a6e',
      zIndex: 900,
      icon: 'scan',
    },
  },
  {
    node: {
      type: 'guidelineAreaNode',
      nodeData: {
        title: 'Pauta',
      },
      nodeBaseType: BaseNodeTypeEnum.AREA,
      label: 'Área de pauta',
      width: 100,
      height: 250,
      color: '#0ea5e9',
      borderColor: '#0c4a6e',
      zIndex: 900,
      icon: 'scan',
    },
  },
  {
    node: {
      type: 'standardTextBlockNode',
      nodeData: {
        textBlock: 'Política 1: Descripción de la política ...',
        textBlockPlaceholder: 'Ingresa una descripción de la política ...',
      },
      nodeBaseType: BaseNodeTypeEnum.TEXT_BLOCK,
      label: 'Bloque de texto de estandard',
      width: 600,
      height: 250,
      color: '#a855f7',
      borderColor: '#581c87',
      zIndex: 900,
      icon: 'text',
    },
  },
  {
    node: {
      type: 'guidelineTextBlockNode',
      nodeData: {
        textBlock: 'Pauta 1: Descripción de la pauta ...',
        textBlockPlaceholder: 'Ingresa una descripción de la pauta ...',
      },
      nodeBaseType: BaseNodeTypeEnum.TEXT_BLOCK,
      label: 'Bloque de texto de pauta',
      width: 600,
      height: 250,
      color: '#a855f7',
      borderColor: '#581c87',
      zIndex: 900,
      icon: 'text',
    },
  },
];

// Artifacts
export const goalsArtifactProps: ArtifactProps = {
  category: ArtifactCategoryEnum.OBJETIVES,
  categoryLabel: 'Objetivos',
  type: ArtifacTypeEnum.GOALS,
  typeLabel: 'Metas',
  presetNodes: goalsNodes,
};

export const blueprintsArtifactProps: ArtifactProps = {
  category: ArtifactCategoryEnum.TOGAF,
  categoryLabel: 'TOGAF',
  type: ArtifacTypeEnum.BLUEPRINTS,
  typeLabel: 'Conceptos',
  presetNodes: blueprintsNodes,
};

export const guidelinesArtifactProps: ArtifactProps = {
  category: ArtifactCategoryEnum.CSVLOD,
  categoryLabel: 'CSVLOD',
  type: ArtifacTypeEnum.GUIDELINES,
  typeLabel: 'Principios',
  presetNodes: csvlodGuidelinesNodes,
};

export const policiesArtifactProps: ArtifactProps = {
  category: ArtifactCategoryEnum.CSVLOD,
  categoryLabel: 'CSVLOD',
  type: ArtifacTypeEnum.POLICIES,
  typeLabel: 'Políticas',
  presetNodes: csvlodPoliciesNodes,
};

export const principlesArtifactProps: ArtifactProps = {
  category: ArtifactCategoryEnum.CSVLOD,
  categoryLabel: 'CSVLOD',
  type: ArtifacTypeEnum.PRINCIPLES,
  typeLabel: 'Principios',
  presetNodes: csvlodPrinciplesNodes,
};

// CSVLOD Artifacts selector
export const csvlodArtifactsSelector: ArtifactSelectorWithSection[] = [
  {
    id: ArtifactDimensionEnum.CONSIDERATIONS,
    section: 'Consideraciones',
    items: [
      {
        id: ArtifacTypeEnum.POLICIES,
        type: ArtifacTypeEnum.POLICIES,
        label: 'Políticas',
        description: 'Crear políticas',
        icon: 'shield-check',
      },
      {
        id: ArtifacTypeEnum.PRINCIPLES,
        type: ArtifacTypeEnum.PRINCIPLES,
        label: 'Principios',
        description: 'Crear principios',
        icon: 'shield-check',
      },
    ],
  },
  {
    id: ArtifactDimensionEnum.STANDARDS,
    section: 'Estandards',
    items: [
      {
        id: ArtifacTypeEnum.GUIDELINES,
        type: ArtifacTypeEnum.GUIDELINES,
        label: 'Pautas',
        description: 'Crear pautas',
        icon: 'shield-check',
      },
    ],
  },
];
