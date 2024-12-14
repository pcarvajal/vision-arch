import RegisterView from '@/components/views/(auth)/register';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Registro',
  description: 'Registro de usuario',
};

const RegisterPage = () => {
  return <RegisterView />;
};

export default RegisterPage;
