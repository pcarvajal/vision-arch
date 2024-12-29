'use client';

import Loader from '@/components/layout/Loader';
import { Select } from '@/components/shared/Select';
import { TArtifactType } from '@/index';
import useFlowStore from '@/store/flow/flowStore';
import useUserStore from '@/store/user/userStore';
import { toast } from 'sonner';

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
    try {
      const artifactTypeItem = item as TArtifactType;
      setParams({ ...params, type: artifactTypeItem });
    } catch (e) {
      toast.error('Error al seleccionar el tipo de artefacto');
    }
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
