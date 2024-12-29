'use client';

import { Select } from '@/components/shared/Select';
import useFlowStore, { AppNode } from '@/store/flowStore';
import { IBaseCustomData } from '@/types/reactflow';

export interface SelectNodeProps {
  presets: IBaseCustomData[];
  className?: string;
}

export const SelectNodes = ({ className, presets }: SelectNodeProps) => {
  const { setNodes, nodes } = useFlowStore((state) => state);

  const handleNodeSelect = (value: string) => {
    const nodeData = presets.find(
      (preset) => preset.name === value.split('-')[0],
    );
    const location = Math.random() * 200;

    if (nodeData) {
      const newNode: AppNode = {
        id: `${nodes.length + 1}`,
        type: nodeData.type.id,
        position: { x: location, y: location },
        data: { ...nodeData },
      };
      setNodes([...nodes, newNode as AppNode]);
    }
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
