'use client';

import { saveArtifactAction } from '@/actions/artifact.actions';
import {
  ArtifactSchema,
  artifactSchema,
} from '@/libs/validators/artifact.schema';
import useArtifactFlowStore from '@/store/artifactFlowStore';
import useUserStore from '@/store/userStore';
import { ICreateArtifactParams } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea, useUser } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Loader from '../layout/Loader';

const defaultValues = {
  name: '',
  description: '',
  yearProjection: 0,
  type: '',
  data: '',
};

export const SaveArtifactForm = () => {
  const loading = useUserStore((state) => state.loading);
  const setLoading = useUserStore((state) => state.setLoading);
  const artifactFlow = useArtifactFlowStore((state) => state);

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
      artifactFlow === null ||
      !artifactFlow ||
      !artifactFlow.edges ||
      !artifactFlow.nodes ||
      !artifactFlow.params
    ) {
      setLoading(false);
      return toast.error('Error al recuperar el artefacto');
    }

    const params: ICreateArtifactParams = {
      ...values,
      data: JSON.stringify({ ...artifactFlow.edges, ...artifactFlow.nodes }),
      type: artifactFlow.params?.type,
      yearProjection: artifactFlow.params?.year,
    };

    const result = await saveArtifactAction(params);

    if (result?.response?.message === 'error') {
      setLoading(false);
      return toast.error(result.response.message || 'Ha ocurrido un error');
    }

    artifactFlow.clearPersistedStore();
    setLoading(false);
    reset(defaultValues);
    return toast.success('Artefacto guardado correctamente');
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
