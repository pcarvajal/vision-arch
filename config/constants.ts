import { CustomNode } from '@/types';
import {
  DiamondPlus,
  OctagonAlert,
  PackagePlus,
  Ruler,
  Scan,
  SquareDashedKanban,
  Text,
} from 'lucide-react';

// Roles
export const roles = ['owner', 'admin', 'user'] as const;

// Proyections
export const yearRange = {
  min: 2024,
  max: 2028,
  default: 2024,
};

// Nodes
// Goals
export const goalsNodes: CustomNode[] = [
  {
    type: 'objetiveNode',
    data: {
      nodeData: {
        title: '',
        description: '',
      },
      icon: DiamondPlus,
      iconColor: '#16a34a',
      label: 'Objetivo',
      category: 'objetives',
      categoryLabel: 'Objetivos',
      borderColor: 'border-green-600',
    },
  },
  {
    type: 'problemNode',
    data: {
      nodeData: {
        title: '',
        description: '',
      },
      label: 'Problema',
      icon: OctagonAlert,
      iconColor: '#dc2626',
      category: 'objetives',
      categoryLabel: 'Objetivos',
      borderColor: 'border-red-600',
    },
  },
  {
    type: 'conceptNode',
    data: {
      nodeData: {
        title: '',
        description: '',
      },
      label: 'Concepto',
      category: 'objetives',
      categoryLabel: 'Objetivos',
      icon: SquareDashedKanban,
      iconColor: '#9333ea',
      borderColor: 'border-purple-600',
    },
  },
  {
    type: 'featureNode',
    data: {
      nodeData: {
        title: '',
        description: '',
      },
      category: 'objetives',
      categoryLabel: 'Objetivos',
      label: 'Característica',
      icon: PackagePlus,
      iconColor: '#ca8a04',
      borderColor: 'border-yellow-600',
    },
  },
  {
    type: 'basicNode',
    data: {
      nodeData: {
        title: '',
        description: '',
      },
      category: 'objetives',
      categoryLabel: 'Objetivos',
      label: 'Básico',
      icon: Ruler,
      iconColor: '#475569',
      borderColor: 'border-slate-600',
    },
  },
];
// Blueprints
export const blueprintsNodes: CustomNode[] = [
  {
    type: 'actorNode',
    data: {
      nodeData: {
        titlePlaceholder: 'Ingresa un actor ...',
      },
      category: 'togaf',
      categoryLabel: 'TOGAF',
      label: 'Actor',
      color: '#f8fafc',
      backgroundColor: '#fcd34d',
      icon: DiamondPlus,
      iconColor: '#16a34a',
      width: 200,
      height: 100,
    },
  },
  {
    type: 'systemNode',
    data: {
      nodeData: {
        titlePlaceholder: 'Ingresa un sistema ...',
      },
      category: 'togaf',
      categoryLabel: 'TOGAF',
      label: 'Sistema',
      color: '#f8fafc',
      backgroundColor: '#f0abfc',
      icon: OctagonAlert,
      iconColor: '#dc2626',
      width: 200,
      height: 100,
    },
  },
  {
    type: 'processNode',
    data: {
      nodeData: {
        titlePlaceholder: 'Ingresa un proceso ...',
      },
      category: 'togaf',
      categoryLabel: 'TOGAF',
      label: 'Proceso',
      color: '#f8fafc',
      backgroundColor: '#a78bfa',
      icon: SquareDashedKanban,
      iconColor: '#9333ea',
      width: 200,
      height: 100,
    },
  },
  {
    type: 'dataNode',
    data: {
      nodeData: {
        titlePlaceholder: 'Ingresa una fuente de datos ...',
      },
      category: 'togaf',
      categoryLabel: 'TOGAF',
      label: 'Dato',
      color: '#475569',
      backgroundColor: '#f8fafc',
      icon: PackagePlus,
      iconColor: '#ca8a04',
      width: 200,
      height: 100,
    },
  },
  {
    type: 'infrastructureNode',
    data: {
      nodeData: {
        titlePlaceholder: 'Ingresa una componente de infraestructura ...',
      },
      category: 'togaf',
      categoryLabel: 'TOGAF',
      label: 'Infraestructura',
      color: '#f8fafc',
      backgroundColor: '#f9a8d4',
      icon: Ruler,
      iconColor: '#475569',
      width: 200,
      height: 100,
    },
  },
];

// CSVLOD : Policies
export const csvlodPoliciesNodes: CustomNode[] = [
  {
    type: 'policyTypeAreaNode',
    data: {
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
      icon: Scan,
    },
  },
  {
    type: 'policyAreaNode',
    data: {
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
      icon: Scan,
    },
  },
  {
    type: 'policyDescriptionAreaNode',
    data: {
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
      icon: Scan,
    },
  },
  {
    type: 'policyTypeLabelNode',
    data: {
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
      icon: Text,
    },
  },
  {
    type: 'policyTextBlockNode',
    data: {
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
      icon: Text,
    },
  },
  {
    type: 'policyDescriptionTextBlockNode',
    data: {
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
      icon: Text,
    },
  },
];
// CSVLOD: Principles
export const csvlodPrinciplesNodes: CustomNode[] = [
  {
    type: 'principleTitleAndItemsNode',
    data: {
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
      icon: Text,
    },
  },
];
// CSVLOD: Guidelines
export const csvlodGuidelinesNodes: CustomNode[] = [
  {
    type: 'standardAreaNode',
    data: {
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
      icon: Scan,
    },
  },
  {
    type: 'guidelineAreaNode',
    data: {
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
      icon: Scan,
    },
  },
  {
    type: 'standardTextBlockNode',
    data: {
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
      icon: Text,
    },
  },
  {
    type: 'guidelineTextBlockNode',
    data: {
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
      icon: Text,
    },
  },
];
