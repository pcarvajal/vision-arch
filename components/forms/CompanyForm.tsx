'use client';

import {
  saveCompanyAction,
  updateCompanyAction,
} from '@/actions/company.actions';
import { routes } from '@/config/routes';
import { CompanySchema, companySchema } from '@/libs/validators/company.schema';
import useUserStore from '@/store/user/userStore';
import { ICreateCompanyResponse, IGetCompanyResponse } from '@/types/actions';
import { ICompany } from '@/types/appwrite';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { IActionResponse } from '../../types/actions';
import Loader from '../layout/Loader';

interface CompanyFormProps {
  initialValues?: ICompany;
}

const CompanyForm = ({ initialValues }: CompanyFormProps) => {
  const router = useRouter();
  const companyName = useUserStore((state) => state?.company?.name);
  const loading = useUserStore((state) => state.loading);
  const setLoading = useUserStore((state) => state.setLoading);
  const setCompany = useUserStore((state) => state.setCompany);
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit = async (data: CompanySchema) => {
    setLoading(true);
    let result:
      | IActionResponse<IGetCompanyResponse>
      | IActionResponse<ICreateCompanyResponse>;

    if (initialValues) {
      result = await updateCompanyAction(data);

      if (result?.response?.type === 'error' || !result?.data) {
        setLoading(false);
        return toast.error(result?.response?.message || 'Ha ocurrido un error');
      }
    } else {
      result = await saveCompanyAction(data);

      if (result?.response?.type === 'error' || !result?.data) {
        setLoading(false);
        return toast.error(result?.response?.message || 'Ha ocurrido un error');
      }
    }

    if (result.data.company.id) {
      setCompany({
        ...result.data.company,
      });
    }

    if ('user' in result.data && result.data.user.id) {
      setUser({
        ...result.data.user,
      });
    }

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
