'use client';

import { createAuthCookie } from '@/actions/auth.action';
import { LoginSchema } from '@/helpers/schemas';
import { LoginFormType } from '@/helpers/types';
import { Button, Input } from '@nextui-org/react';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const LoginView = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: 'admin@acme.com',
    password: 'admin',
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      // `values` contains email & password. You can use provider to connect user

      await createAuthCookie();
      router.replace('/');
    },
    [router],
  );

  return (
    <>
      <div className="mb-6 text-center text-[25px] font-bold">Comenzar</div>

      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleLogin}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="mb-4 flex w-1/2 flex-col gap-4">
              <Input
                variant="bordered"
                label="Email"
                type="email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange('email')}
              />
              <Input
                variant="bordered"
                label="Contraseña"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange('password')}
              />
            </div>

            <Button onPress={() => handleSubmit()} variant="flat" color="primary">
              Entrar
            </Button>
          </>
        )}
      </Formik>

      <div className="mt-4 text-sm font-light text-slate-400">
        No tienes una cuenta?{' '}
        <Link href="/register" className="font-bold">
          Registrate
        </Link>
      </div>
    </>
  );
};
