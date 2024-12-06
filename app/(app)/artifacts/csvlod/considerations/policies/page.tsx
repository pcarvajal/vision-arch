import { CreatePoliciesView } from '@/components/views/(app)/artifacts/csvlod/considerations/policies';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Crear | CSVLOD/Consideraciones/Politicas',
  description: 'Politicas de la organización',
};

const PoliciesPage = () => {
  return <CreatePoliciesView />;
};

export default PoliciesPage;
