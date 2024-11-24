import React from 'react';
import { Metadata } from 'next';
import RegisterView from '@/components/views/(auth)/register';

export const metadata: Metadata = {
  title: 'Registro',
  description: 'Registro de usuario',
};

const register = () => {
  return <RegisterView />;
};

export default register;
