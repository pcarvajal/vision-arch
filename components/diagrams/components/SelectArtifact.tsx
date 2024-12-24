'use client';

import { getArtifactsAction } from '@/actions/artifact.actions';
import { Select } from '@/components/shared/Select';
import { TArtifactType } from '@/index';
import { useEffect, useState } from 'react';

export interface Item {
  key: string;
  label: string;
}

export interface SelectArtifactProps {
  artifactName: TArtifactType;
  className?: string;
}

export const SelectArtifact = ({
  className,
  artifactName,
}: SelectArtifactProps) => {
  const [items, setItems] = useState<Item[] | []>([]);

  useEffect(() => {
    async function getArtifacts() {
      const goals = await getArtifactsAction(artifactName);
      setItems(goals.map((goal: any) => ({ key: goal.$id, label: goal.name })));
    }
    getArtifacts();
  }, []);

  return (
    <Select
      label="Seleccionar artefacto"
      items={items.map((item, idx) => ({
        key: item.key,
        label: item.label,
      }))}
      onValueChange={() => {}}
      className={className}
    />
  );
};
