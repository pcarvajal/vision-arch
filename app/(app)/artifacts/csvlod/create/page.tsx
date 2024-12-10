import { CsvlodCreateView } from '@/components/views/(app)/artifacts/csvlod/create';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'CSVLOD | Crear',
  description: 'CSVLOD de la organización',
};

const CsvlodCreatePage = () => {
  return <CsvlodCreateView />;
};

export default CsvlodCreatePage;
