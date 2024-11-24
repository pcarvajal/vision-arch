'use client';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompanySchema, companySchema } from '@/libs/validators/company.schema';
import { saveCompanyAction } from '@/actions/company.actions';

interface CompanyInitialValues {
  id: string;
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
}

interface CompanyFormProps {
  initialValues?: CompanyInitialValues;
}

const CompanyForm = ({ initialValues }: CompanyFormProps) => {
  const onSubmit = async (data: CompanySchema) => {
    const response = await saveCompanyAction(data);
    if (response?.type === 'error') {
      console.log('Error saving company data:', response.message);
    }
    console.log('Flow data saved:', response);
  };

  const methods = useForm({
    defaultValues: initialValues || {
      id: '',
      name: '',
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
