import { BlueprintNodeTypes } from '@/types';
import { CustomNode } from '@/types/types';
import { Position } from '@xyflow/react';
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

// Csvlod : Policies
export const csvlodPoliciesNodes: Array<CustomNode> = [
  {
    id: '1',
    type: 'policyTypeAreaNode',
    position: {
      x: 0,
      y: 0,
    },
    data: {
      type: 'policyTypeAreaNode',
      label: 'Tipo de política',
      width: 100,
      height: 250,
      color: '#0ea5e9',
      borderColor: '#0c4a6e',
      zIndex: 900,
    },
  },
  {
    id: '2',
    type: 'policyAreaNode',
    position: {
      x: 0,
      y: 0,
    },
    data: {
      type: 'policyAreaNode',
      label: 'Política',
      width: 140,
      height: 250,
      color: '#eab308',
      borderColor: '#713f12',
      zIndex: 900,
    },
  },
  {
    id: '3',
    type: 'policyDescriptionAreaNode',
    position: {
      x: 0,
      y: 0,
    },
    data: {
      type: 'policyDescriptionAreaNode',
      label: 'Descripción de la política',
      width: 600,
      height: 250,
      color: '#a855f7',
      borderColor: '#581c87',
      zIndex: 900,
    },
  },
  {
    id: '4',
    type: 'policyTypeLabelNode',
    position: {
      x: 0,
      y: 0,
    },
    data: {
      type: 'policyTypeLabelNode',
      label: 'Tipo de política',
      width: 88,
      height: 193,
      color: '',
      borderColor: '',
      zIndex: undefined,
    },
  },
  {
    id: '5',
    type: 'policyTextBlockNode',
    position: {
      x: 300,
      y: 500,
    },
    data: {
      type: 'policyTextBlockNode',
      label: 'Titulo de política',
      width: 110,
      height: 80,
      color: '',
      borderColor: '',
      customData: {
        textBlock: 'Mi Política 1 ...',
      },
    },
  },
  {
    id: '6',
    type: 'policyDescriptionTextBlockNode',
    position: {
      x: 300,
      y: 400,
    },
    data: {
      type: 'policyDescriptionTextBlockNode',
      label: 'Texto de descripción de política',
      width: 240,
      height: 80,
      color: '',
      borderColor: '',
      customData: {
        textBlock: 'Política 1: Descripción de la política ...',
      },
    },
  },
];
