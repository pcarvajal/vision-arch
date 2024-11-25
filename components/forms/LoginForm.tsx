'use client';

import { loginAction } from '@/actions/auth.action';
import { routes } from '@/config/routes';
import { LoginSchema, loginSchema } from '@/libs/validators/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Loader from '../layout/Loader';
import { useState } from 'react';
import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';

const defaultValues = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (values: LoginSchema) => {
    setLoading(true);
    const result = await loginAction(values);

    if (result?.type === 'error') {
      setLoading(false);
      return toast.error(result.message);
    }

    console.log(result);

    setUser(result);

    setLoading(false);
    reset(defaultValues);
    router.push(routes.protected.index);
  };

  return (
    <>
      <Loader show={loading} />
      <div className="mb-6 text-center text-[25px] font-bold">Comenzar</div>
      <form onSubmit={handleSubmit(onSubmit)} className='"mb-4 flex w-1/2 flex-col gap-4'>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Email"
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

        <Button type="submit" variant="flat" color="primary">
          Entrar
        </Button>
      </form>

      <div className="mt-4 text-sm font-light text-slate-400">
        No tienes una cuenta?{' '}
        <Link href={routes.public.register} className="font-bold">
          Registrate
        </Link>
      </div>
    </>
  );
};
