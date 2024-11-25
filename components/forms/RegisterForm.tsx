'use client';

import { registerAction } from '@/actions/auth.action';
import { RegisterSchema, registerSchema } from '@/libs/validators/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Loader from '../layout/Loader';
import { useState } from 'react';

const defaultValues = {
  email: '',
  name: '',
  companyName: '',
  password: '',
  confirmPassword: '',
};

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (values: RegisterSchema) => {
    setLoading(true);
    const result = await registerAction(values);

    if (result?.type === 'error') {
      setLoading(false);
      return toast.error(result.message);
    }
    setLoading(false);
    toast.success('Usuario registrado correctamente, revisa tu email para continuar');

    reset(defaultValues);
  };

  return (
    <>
      <Loader show={loading} />
      <div className="mb-6 text-center text-[25px] font-bold">Registrate</div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex w-1/2 flex-col gap-4">
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Nombre de la Compañia"
              isInvalid={!!errors?.name}
              errorMessage={errors?.name?.message}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Tu Nombre"
              isInvalid={!!errors?.name}
              errorMessage={errors?.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Tu Email Corporativo"
              type="email"
              isInvalid={!!errors?.email}
              errorMessage={errors?.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Contraseña"
              type="password"
              isInvalid={!!errors?.password}
              errorMessage={errors?.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Confirmar contraseña"
              type="password"
              isInvalid={!!errors?.confirmPassword}
              errorMessage={errors?.confirmPassword?.message}
            />
          )}
        />

        <Button type="submit" variant="flat" color="primary">
          Registrate
        </Button>
      </form>

      <div className="mt-4 text-sm font-light text-slate-400">
        Ya tienes una cuenta ?{' '}
        <Link href="/login" className="font-bold">
          Entra aquí
        </Link>
      </div>
    </>
  );
};
