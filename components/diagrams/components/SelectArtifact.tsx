'use client';

import {
  getArtifactAction,
  getArtifactsAction,
} from '@/actions/artifact.actions';
import Loader from '@/components/layout/Loader';
import { Select } from '@/components/shared/Select';
import { IFlow, TArtifactType } from '@/index';
import useFlowStore from '@/store/flow/flowStore';
import useUserStore from '@/store/user/userStore';
import { IArtifact } from '@/types/appwrite';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
  const { loading, setLoading } = useUserStore();
  const [items, setItems] = useState<Item[] | []>([]);
  const flowStore = useFlowStore((state) => state);

  useEffect(() => {
    async function getArtifacts() {
      setLoading(true);
      try {
        const artifacts = await getArtifactsAction(artifactName);
        if (artifacts.data?.artifacts && artifacts.data.artifacts.length > 0) {
          setItems(
            artifacts.data?.artifacts.map((artifact: IArtifact) => ({
              key: artifact.id,
              label: artifact.name,
            })),
          );
        }
      } catch (error) {
        toast.error('Error al obtener los artefactos');
      } finally {
        setLoading(false);
      }
    }
    getArtifacts();
  }, [artifactName]);

  const handleSelect = async (item: string) => {
    setLoading(true);
    try {
      const foundItem = items.find((i) => i.key === item);
      if (foundItem) {
        const itemData = await getArtifactAction(foundItem?.key);
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
    } catch (error) {
      toast.error('Error al obtener el artefacto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader show={loading} />
      <Select
        label="Seleccionar artefacto"
        items={items.map((item, idx) => ({
          key: item.key,
          label: item.label,
        }))}
        onValueChange={handleSelect}
        className={className}
      />
    </>
  );
};
