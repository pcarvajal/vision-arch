import React from 'react';
import { GoalsView } from '@/components/views/(app)/artifacts/goals';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Objetivos',
  description: 'Objetivos de la organización',
};

const GoalsPage = () => {
  return <GoalsView />;
};

export default GoalsPage;
