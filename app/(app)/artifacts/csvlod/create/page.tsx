import { CsvlodCreateView } from '@/components/views/(app)/artifacts/csvlod/create';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Crear | CSVLOD',
  description: 'Artefactos CSVLOD',
};

const PoliciesPage = () => {
  return <CsvlodCreateView />;
};

export default PoliciesPage;
