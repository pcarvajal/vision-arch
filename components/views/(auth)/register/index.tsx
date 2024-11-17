'use client';

import { createAuthCookie } from '@/actions/auth.action';
import { RegisterSchema } from '@/helpers/schemas';
import { RegisterFormType } from '@/helpers/types';
import { Button, Input } from '@nextui-org/react';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const RegisterView = () => {
  const router = useRouter();

  const initialValues: RegisterFormType = {
    name: 'Acme',
    email: 'admin@acme.com',
    password: 'admin',
    confirmPassword: 'admin',
  };

  const handleRegister = useCallback(
    async (values: RegisterFormType) => {
      // `values` contains name, email & password. You can use provider to register user

      await createAuthCookie();
      router.replace('/');
    },
    [router],
  );

  return (
    <>
      <div className="mb-6 text-center text-[25px] font-bold">Registrate</div>

      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="mb-4 flex w-1/2 flex-col gap-4">
              <Input
                variant="bordered"
                label="Nombre"
                value={values.name}
                isInvalid={!!errors.name && !!touched.name}
                errorMessage={errors.name}
                onChange={handleChange('name')}
              />
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
              <Input
                variant="bordered"
                label="Confirmar contraseña"
                type="password"
                value={values.confirmPassword}
                isInvalid={!!errors.confirmPassword && !!touched.confirmPassword}
                errorMessage={errors.confirmPassword}
                onChange={handleChange('confirmPassword')}
              />
            </div>

            <Button onPress={() => handleSubmit()} variant="flat" color="primary">
              Registrate
            </Button>
          </>
        )}
      </Formik>

      <div className="mt-4 text-sm font-light text-slate-400">
        Ya tienes una cuenta ?{' '}
        <Link href="/login" className="font-bold">
          Entra aquí
        </Link>
      </div>
    </>
  );
};
