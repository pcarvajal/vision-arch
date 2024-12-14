import { VisualizeGoalsView } from '@/components/views/(app)/artifacts/goals/visualize';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Objetivos | Visualizar',
  description: 'Objetivos de la organización',
};

const VisualizeGoalsPage = () => {
  return <VisualizeGoalsView />;
};

export default VisualizeGoalsPage;
