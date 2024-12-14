import { EditCsvlodView } from '@/components/views/(app)/artifacts/csvlod/edit';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'CSVLOD | Editar',
  description: 'CSVLOD de la organización',
};

const CsvlodCreatePage = () => {
  return <EditCsvlodView />;
};

export default CsvlodCreatePage;
