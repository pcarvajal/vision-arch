import { BlueprintNodeTypes } from '@/types';
import {
  DiamondPlus,
  OctagonAlert,
  PackagePlus,
  Ruler,
  SquareDashedKanban,
} from 'lucide-react';

// Roles
export const roles = ['owner', 'admin', 'user'] as const;

// Nodes
// Goals
export const goalsNodes: Array<{
  type: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  data: {
    title?: string;
    description?: string;
    borderColor?: string;
  };
}> = [
  {
    type: 'objetiveNode',
    name: 'Objetivo',
    icon: DiamondPlus,
    iconColor: '#16a34a',
    data: {
      title: '',
      description: '',
      borderColor: 'border-green-600',
    },
  },
  {
    type: 'problemNode',
    name: 'Problema',
    icon: OctagonAlert,
    iconColor: '#dc2626',
    data: {
      title: '',
      description: '',
      borderColor: 'border-red-600',
    },
  },
  {
    type: 'conceptNode',
    name: 'Concepto',
    icon: SquareDashedKanban,
    iconColor: '#9333ea',
    data: {
      title: '',
      description: '',
      borderColor: 'border-purple-600',
    },
  },
  {
    type: 'featureNode',
    name: 'Característica',
    icon: PackagePlus,
    iconColor: '#ca8a04',
    data: {
      title: '',
      description: '',
      borderColor: 'border-yellow-600',
    },
  },
  {
    type: 'basicNode',
    name: 'Básico',
    icon: Ruler,
    iconColor: '#475569',
    data: {
      title: '',
      description: '',
      borderColor: 'border-slate-600',
    },
  },
];

// Blueprints
export const blueprintsNodes: Array<{
  type: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  data: {
    label: string;
    textColor: string;
    backgroundColor: string;
    type: BlueprintNodeTypes;
    width: number;
    height: number;
    placeholder: string;
  };
}> = [
  {
    type: 'actorNode',
    name: 'Actor',
    icon: DiamondPlus,
    iconColor: '#16a34a',
    data: {
      label: 'Actor',
      textColor: '#f8fafc',
      backgroundColor: '#fcd34d',
      type: 'actorNode',
      width: 200,
      height: 100,
      placeholder: 'Ingresa un actor ...',
    },
  },
  {
    type: 'systemNode',
    name: 'Sistema',
    icon: OctagonAlert,
    iconColor: '#dc2626',
    data: {
      label: 'Sistema',
      textColor: '#f8fafc',
      backgroundColor: '#f0abfc',
      type: 'systemNode',
      width: 200,
      height: 100,
      placeholder: 'Ingresa un sistema ...',
    },
  },
  {
    type: 'processNode',
    name: 'Proceso',
    icon: SquareDashedKanban,
    iconColor: '#9333ea',
    data: {
      label: 'Proceso',
      textColor: '#f8fafc',
      backgroundColor: '#a78bfa',
      type: 'processNode',
      width: 200,
      height: 100,
      placeholder: 'Ingresa un proceso ...',
    },
  },
  {
    type: 'dataNode',
    name: 'Dato',
    icon: PackagePlus,
    iconColor: '#ca8a04',
    data: {
      label: 'Dato',
      textColor: '#475569',
      backgroundColor: '#f8fafc',
      type: 'dataNode',
      width: 200,
      height: 100,
      placeholder: 'Ingresa una fuente de datos ...',
    },
  },
  {
    type: 'infrastructureNode',
    name: 'Infraestructura',
    icon: Ruler,
    iconColor: '#475569',
    data: {
      label: 'Infraestructura',
      textColor: '#f8fafc',
      backgroundColor: '#f9a8d4',
      type: 'infrastructureNode',
      width: 200,
      height: 100,
      placeholder: 'Ingresa una componente de infraestructura ...',
    },
  },
];
