import { CreateGoalsView } from '@/components/views/(app)/artifacts/goals/create';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Objetivos',
  description: 'Objetivos de la organización',
};

const GoalsPage = () => {
  return <CreateGoalsView />;
};

export default GoalsPage;
