'use client';

import { saveArtifactAction } from '@/actions/artifact.actions';
import {
  ArtifactSchema,
  artifactSchema,
} from '@/libs/validators/artifact.schema';
import useFlowStore from '@/store/flow/flowStore';
import useUserStore from '@/store/user/userStore';
import { ICreateArtifactParams } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useReactFlow } from '@xyflow/react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Loader from '../layout/Loader';
import SaveArtifactModal from '../modals/SaveArtifactModal';

const defaultValues = {
  name: '',
  description: '',
  yearProjection: 0,
  type: '',
  data: '',
};

interface SaveArtifactFormProps {
  onSave: () => void;
}

export const SaveArtifactForm = ({ onSave }: SaveArtifactFormProps) => {
  const { getViewport } = useReactFlow();
  const router = useRouter();
  const loading = useUserStore((state) => state.loading);
  const setLoading = useUserStore((state) => state.setLoading);
  const flowStore = useFlowStore((state) => state);

  const handleOnSave = () => {
    onSave();
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(artifactSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (values: ArtifactSchema) => {
    setLoading(true);

    if (
      flowStore === null ||
      !flowStore ||
      !flowStore.edges ||
      !flowStore.nodes ||
      !flowStore.params
    ) {
      setLoading(false);
      return toast.error('Error al recuperar el artefacto');
    }

    const params: ICreateArtifactParams = {
      ...values,
      data: JSON.stringify({
        nodes: flowStore.nodes,
        edges: flowStore.edges,
        viewport: getViewport(),
      }),
      type: flowStore.params?.type,
      yearProjection: flowStore.params?.year!,
    };

    const result = await saveArtifactAction(params);

    if (result?.response?.message === 'error') {
      setLoading(false);
      return toast.error(result.response.message || 'Ha ocurrido un error');
    }

    flowStore.clearPersistedStore();
    setLoading(false);
    reset(defaultValues);
    toast.success('Artefacto guardado correctamente');
    handleOnSave();
    router.refresh();
  };

  return (
    <>
      <Loader show={loading} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Nombre del artefacto"
              type="text"
              isInvalid={!!errors?.name}
              errorMessage={errors?.name?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              variant="bordered"
              label="Descripción del artefacto"
              type="text"
              isInvalid={!!errors?.description}
              errorMessage={errors?.description?.message}
            />
          )}
        />

        <Button type="submit" variant="flat" color="primary">
          Guardar
        </Button>
      </form>
    </>
  );
};
