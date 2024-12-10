import { CustomNodeSelect } from '@/types';

const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

const getCustomNodeSelectItemsWithSections = (
  nodes: any,
): CustomNodeSelect[] => {
  const nodeList = nodes.map((item: any) => {
    return {
      id: item.id,
      type: item.key,
      label: item.label,
      icon: item.icon,
      description: item.description,
    };
  });
  return nodes.map((description: any) => {
    return {
      section: description.section,
      items: nodeList,
    };
  });
};

// const getArtifactType = (type: string) => {

export { parseStringify, getCustomNodeSelectItemsWithSections };
