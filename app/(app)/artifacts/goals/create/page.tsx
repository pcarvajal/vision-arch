import { CreateGoalsView } from '@/components/views/(app)/artifacts/goals/create';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Objetivos | Crear',
  description: 'Objetivos de la organización',
};

const GoalsCreatePage = () => {
  return <CreateGoalsView />;
};

export default GoalsCreatePage;
