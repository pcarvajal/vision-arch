import { LoginView } from '@/components/views/(auth)/login';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Ingresa',
  description: 'Inicia sesión',
};

const LoginPage = () => {
  return <LoginView />;
};

export default LoginPage;
