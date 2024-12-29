'use client';

import {
  getArtifactAction,
  getArtifactsAction,
} from '@/actions/artifact.actions';
import { Select } from '@/components/shared/Select';
import { IFlow, TArtifactType } from '@/index';
import useFlowStore from '@/store/flow/flowStore';
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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const flowStore = useFlowStore((state) => state);

  useEffect(() => {
    async function getArtifacts() {
      console.log('CHANGE', artifactName);
      const artifacts = await getArtifactsAction(artifactName);
      if (artifacts.data?.artifacts && artifacts.data.artifacts.length > 0) {
        setItems(
          artifacts.data?.artifacts.map((artifact: IArtifact) => ({
            key: artifact.id,
            label: artifact.name,
          })),
        );
      }
    }
    getArtifacts();
  }, [artifactName]);

  const handleSelect = (item: string) => {
    const foundItem = items.find((i) => i.key === item);
    if (foundItem) setSelectedItem(foundItem.key);
  };

  useEffect(() => {
    async function getArtifact() {
      if (!selectedItem) return;
      const itemData = await getArtifactAction(selectedItem);
      if (itemData.data) {
        flowStore.clearPersistedStore();
        const flow: IFlow = JSON.parse(itemData.data.artifact.data);
        flowStore.setEdges(flow.edges);
        flowStore.setNodes(flow.nodes);
        flowStore.setParams({
          type: itemData.data.artifact.type,
          year: itemData.data.artifact.yearProjection,
          id: itemData.data.artifact.id,
        });
      }
    }
    getArtifact();
  }, [selectedItem]);

  return (
    <Select
      label="Seleccionar artefacto"
      items={items.map((item, idx) => ({
        key: item.key,
        label: item.label,
      }))}
      onValueChange={handleSelect}
      className={className}
    />
  );
};
