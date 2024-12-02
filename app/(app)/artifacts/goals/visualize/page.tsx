import { VisualizeGoalsView } from '@/components/views/(app)/artifacts/goals/visualize';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Editar | Objetivos',
  description: 'Objetivos de la organización',
};

const EditGoalsPage = () => {
  return <VisualizeGoalsView />;
};

export default EditGoalsPage;
