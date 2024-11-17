import React from 'react';
import { LoginView } from '@/components/views/(auth)/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ingresa',
  description: 'Inicia sesión',
};

const login = () => {
  return <LoginView />;
};

export default login;
