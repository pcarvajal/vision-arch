'use client';

import {
  saveCompanyAction,
  updateCompanyAction,
} from '@/actions/company.actions';
import { routes } from '@/config/routes';
import { CompanySchema, companySchema } from '@/libs/validators/company.schema';
import useUserStore from '@/store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Loader from '../layout/Loader';

interface CompanyInitialValues {
  id?: string;
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
}

interface CompanyFormProps {
  initialValues?: CompanyInitialValues;
  companyName?: string;
}

const CompanyForm = ({ initialValues, companyName }: CompanyFormProps) => {
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const router = useRouter();

  const onSubmit = async (data: CompanySchema) => {
    setLoading(true);
    let result;

    if (initialValues) {
      result = await updateCompanyAction(data);
    } else {
      result = await saveCompanyAction(data);
    }

    if (result?.type === 'error') {
      setLoading(false);
      return toast.error(result.message);
    }
    if (!user) return;
    updateUser({ ...user, companyId: result.id, companyName: result.name });

    setLoading(false);
    router.push(routes.protected.index);
  };

  const methods = useForm({
    defaultValues: initialValues || {
      id: '',
      name: companyName || '',
      mission: '',
      vision: '',
      objetives: '',
      description: '',
    },
    resolver: zodResolver(companySchema),
  });
  const { control, handleSubmit, formState } = methods;

  return (
    <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit(onSubmit)}>
      <Loader show={loading} />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            isInvalid={!!formState.errors?.name}
            errorMessage={formState.errors?.name?.message?.toString()}
            type="text"
            placeholder="Nombre de tu compañia"
            variant="faded"
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            isInvalid={!!formState.errors?.description}
            errorMessage={formState.errors?.description?.message}
            className="flex"
            type="text"
            placeholder="Descripción de tu compañia"
            variant="faded"
            description=" Describe en pocas palabras la razón de ser de tu empresa: ¿qué propósito busca cumplir y cómo contribuye al bienestar de tus clientes o la sociedad? Este valor será analizado por nuestra IA para identificar los principios fundamentales que guían tus operaciones y construir una representación precisa de tu negocio."
          />
        )}
      />
      <Controller
        name="mission"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            isInvalid={!!formState.errors?.mission}
            errorMessage={formState.errors?.mission?.message}
            className="flex"
            type="text"
            placeholder="Misión de tu compañia"
            variant="faded"
            description=" Describe en pocas palabras la razón de ser de tu empresa: ¿qué propósito busca cumplir y cómo contribuye al bienestar de tus clientes o la sociedad? Este valor será analizado por nuestra IA para identificar los principios fundamentales que guían tus operaciones y construir una representación precisa de tu negocio."
          />
        )}
      />

      <Controller
        name="vision"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            isInvalid={!!formState.errors?.vision}
            errorMessage={formState.errors?.vision?.message}
            className="flex"
            type="text"
            placeholder="Visión de tu compañia"
            variant="faded"
            description="Comparte la aspiración a futuro de tu empresa: ¿qué deseas lograr o en qué quieres convertirte en los próximos años? Nuestra IA procesará esta información para proyectar tus metas estratégicas en un modelo visual."
          />
        )}
      />

      <Controller
        name="objetives"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            isInvalid={!!formState.errors?.objetives}
            errorMessage={formState.errors?.objetives?.message}
            className="flex"
            type="text"
            placeholder="Objetivos de tu compañia"
            variant="faded"
            description="Comparte la aspiración a futuro de tu empresa: ¿qué deseas lograr o en qué quieres convertirte en los próximos años? Nuestra IA procesará esta información para proyectar tus metas estratégicas en un modelo visual."
          />
        )}
      />

      <div className="flex flex-row justify-end">
        <Button type="submit" color="primary">
          Guardar
        </Button>
      </div>
    </form>
  );
};
export default CompanyForm;
