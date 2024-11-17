import React from 'react';
import { RegisterView } from '@/components/views/(auth)/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registro',
  description: 'Registro de usuario',
};

const register = () => {
  return <RegisterView />;
};

export default register;
