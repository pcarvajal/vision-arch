import { EditBlueprintsView } from '@/components/views/(app)/artifacts/blueprints/edit';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conceptos | Editar',
  description: 'Conceptos de la organización',
};

const EditBlueprintsPage = () => {
  return <EditBlueprintsView />;
};

export default EditBlueprintsPage;
