import React from 'react';
import { Metadata } from 'next';
import { LoginView } from '@/components/views/(auth)/login';

export const metadata: Metadata = {
  title: 'Ingresa',
  description: 'Inicia sesión',
};

const login = () => {
  return <LoginView />;
};

export default login;
