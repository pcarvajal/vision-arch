'use client';

import { saveArtifactAction } from '@/actions/artifact.actions';
import {
  ArtifactSchema,
  artifactSchema,
} from '@/libs/validators/artifact.schema';
import useArtifactFlowStore from '@/store/artifactFlowStore';
import { CreateArtifactParams } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useState } from 'react';
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
  const [loading, setLoading] = useState(false);

  const artifactFlow = useArtifactFlowStore((state) => state.artifactFlow);
  const deleteArtifactFlow = useArtifactFlowStore(
    (state) => state.deleteArtifactFlow,
  );

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

    if (artifactFlow === null) {
      setLoading(false);
      return toast.error('Error al recuperar el artefacto');
    }

    const params: CreateArtifactParams = {
      ...values,
      data: JSON.stringify(artifactFlow),
      type: artifactFlow.type,
      yearProjection: artifactFlow.year,
    };

    const result = await saveArtifactAction(params);

    if (result?.type === 'error') {
      setLoading(false);
      return toast.error(result.message);
    }

    deleteArtifactFlow();
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
