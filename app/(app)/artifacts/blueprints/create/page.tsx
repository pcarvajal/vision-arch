import { CreateBlueprintsView } from '@/components/views/(app)/artifacts/blueprints/create';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conceptos | Crear',
  description: 'Conceptos de la organización',
};

const CreateBlueprintsPage = () => {
  return <CreateBlueprintsView />;
};

export default CreateBlueprintsPage;
