'use client';

import { Select } from '@/components/shared/Select';
import { TArtifactType } from '@/index';
import useFlowStore from '@/store/flow/flowStore';
import { useState } from 'react';

export interface Item {
  key: string;
  label: string;
}

export interface SelectArtifactProps {
  artifactTypes: Item[];
  defaultSelected?: string;
  className?: string;
}

export const SelectArtifactType = ({
  className,
  artifactTypes,
  defaultSelected,
}: SelectArtifactProps) => {
  const params = useFlowStore((state) => state.params);
  const setParams = useFlowStore((state) => state.setParams);

  const handleSelect = (item: string) => {
    const artifactTypeItem = item as TArtifactType;
    setParams({ ...params, type: artifactTypeItem });
  };

  return (
    <Select
      label="Seleccionar tipo de artefacto"
      items={artifactTypes.map((item, idx) => ({
        key: item.key,
        label: item.label,
      }))}
      selectedKey={defaultSelected}
      onValueChange={handleSelect}
      className={className}
    />
  );
};
