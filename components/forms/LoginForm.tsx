'use client';

import { loginAction } from '@/actions/auth.action';
import { routes } from '@/config/routes';
import { LoginSchema, loginSchema } from '@/libs/validators/login.schema';
import useUserStore from '@/store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Loader from '../layout/Loader';

const defaultValues = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const userStore = useUserStore((state) => state);
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
    const { data, response } = result;

    if (response?.type === 'error') {
      setLoading(false);
      return toast.error(response.message);
    }

    if (data?.account) {
      const account = data.account;
      userStore.setAccount({
        $id: account.$id,
        name: account.name,
        email: account.email,
        labels: account.labels,
        prefs: account.prefs,
        emailVerification: account.emailVerification,
        registration: account.registration,
        mfa: account.mfa,
        accessedAt: account.accessedAt,
        passwordUpdate: account.passwordUpdate,
        phone: account.phone,
        status: account.status,
        phoneVerification: account.phoneVerification,
        targets: account.targets,
        $createdAt: account.$createdAt,
        $updatedAt: account.$updatedAt,
      });
    }

    if (data?.user) {
      const user = data.user;
      userStore.setUser({
        id: user.id,
        email: user.email,
        name: user.name,
        companyId: user.companyId,
        companyName: user.companyName,
        teamId: user.teamId,
        teamName: user.teamName,
        avatar: user.avatar,
      });
    }

    if (data?.company) {
      const company = data.company;
      userStore.setCompany({
        id: company.id,
        name: company.name,
        description: company.description,
        mission: company.mission,
        vision: company.vision,
        objetives: company.objetives,
      });
    }

    setLoading(false);
    reset(defaultValues);
    router.push(routes.protected.index);
  };

  return (
    <>
      <Loader show={loading} />
      <div className="mb-6 text-center text-[25px] font-bold">Comenzar</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='"mb-4 flex w-1/2 flex-col gap-4'
      >
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
        No tienes una cuenta?
        <Link href={routes.public.register} className="font-bold">
          Registrate
        </Link>
      </div>
    </>
  );
};
