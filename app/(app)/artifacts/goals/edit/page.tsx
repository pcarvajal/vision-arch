import { EditGoalsView } from '@/components/views/(app)/artifacts/goals/edit';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Objetivos | Editar',
  description: 'Objetivos de la organización',
};

const EditGoalsPage = () => {
  return <EditGoalsView />;
};

export default EditGoalsPage;
