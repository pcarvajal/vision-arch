'use client';

import { Select } from '@/components/shared/Select';
import { IBaseCustomData } from '@/types/reactflow';
import { useReactFlow } from '@xyflow/react';

export interface SelectNodeProps {
  presets: IBaseCustomData[];
  className?: string;
}

export const SelectNodes = ({ className, presets }: SelectNodeProps) => {
  const { setNodes } = useReactFlow();

  const handleNodeSelect = (value: string) => {
    const nodeData = presets.find(
      (preset) => preset.name === value.split('-')[0],
    );
    const location = Math.random() * 200;

    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id: `${nodes.length + 1}`,
          type: nodeData?.type.id,
          position: { x: location, y: location },
          data: { ...nodeData },
        },
      ];
    });
  };

  return (
    <Select
      label="Seleccionar nodo"
      items={presets.map((preset, idx) => ({
        key: `${preset.name}-${idx}`,
        label: preset.label,
      }))}
      onValueChange={handleNodeSelect}
      className={className}
    />
  );
};
