import { VisualizeBlueprintsView } from '@/components/views/(app)/artifacts/blueprints/visualize';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Visualizar | Conceptos',
  description: 'Conceptos de la organización',
};

const VisualizeBlueprintsPage = () => {
  return <VisualizeBlueprintsView />;
};

export default VisualizeBlueprintsPage;
