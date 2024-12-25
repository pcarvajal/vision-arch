'use client';

import { getArtifactsAction } from '@/actions/artifact.actions';
import { Select } from '@/components/shared/Select';
import { TArtifactType } from '@/index';
import { IArtifact } from '@/types/appwrite';
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
      console.log('GOALS', goals);
      if (goals.data?.artifacts && goals.data.artifacts.length > 0) {
        setItems(
          goals.data?.artifacts.map((goal: IArtifact) => ({
            key: goal.id,
            label: goal.name,
          })),
        );
      }
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
