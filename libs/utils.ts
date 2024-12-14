import {
  ArtifactSelectItem,
  ArtifactSelectorWithSection,
  CustomNodeData,
} from '@/types';

const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

const convertNodesToArtifactSelectorWithSection = (
  nodes: any[],
): ArtifactSelectorWithSection[] => {
  // Agruparemos por la propiedad "subcategoryLabel"
  const grouped = nodes.reduce<Record<string, ArtifactSelectItem[]>>(
    (acc, node) => {
      const section = node.subcategoryLabel;
      if (!section) return acc;

      const item: ArtifactSelectItem = {
        id: node.type,
        type: node.subcategory, // Ajustar a ArtifactType si es necesario
        label: node.subcategoryLabel,
        description: '',
        icon: node.icon,
      };

      if (!acc[section]) {
        acc[section] = [];
      }

      // Evitar duplicados basados en el id
      if (!acc[section].some((existingItem) => existingItem.id === item.id)) {
        acc[section].push(item);
      }

      return acc;
    },
    {},
  );

  // Convertir el objeto agrupado a un array de ArtifactSelectorWithSection
  const result: ArtifactSelectorWithSection[] = Object.entries(grouped).map(
    ([section, items]) => ({
      section,
      items,
    }),
  );

  return result;
};

export { parseStringify, convertNodesToArtifactSelectorWithSection };
