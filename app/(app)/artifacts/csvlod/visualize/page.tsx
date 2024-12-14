import { VisualizeCsvlodView } from '@/components/views/(app)/artifacts/csvlod/visualize';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'CSVLOD | Visualizar',
  description: 'CSVLOD de la organización',
};

const CsvlodVisualizePage = () => {
  return <VisualizeCsvlodView />;
};

export default CsvlodVisualizePage;
