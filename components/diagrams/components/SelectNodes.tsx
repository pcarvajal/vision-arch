'use client';

import Icon from '@/components/shared/Icon';
import { GenericNodeProps } from '@/types';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useReactFlow } from '@xyflow/react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface SelectNodesProps {
  nodes: GenericNodeProps[];
}

export const SelectNodes = ({ nodes }: SelectNodesProps) => {
  const { setNodes } = useReactFlow();
  const presetNodes = nodes.map((node) => node.node);

  const handleNodeSelect = (nodeType: string) => {
    const nodeData = presetNodes.find((node) => node.type === nodeType);
    const location = Math.random() * 200;

    setNodes((nodes) => [
      ...nodes,
      {
        id: `${nodes.length + 1}`,
        type: nodeType,
        position: { x: location, y: location },
        data: {
          ...nodeData,
        },
      },
    ]);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ghost" color="danger">
          Seleccionar Nodo
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Menu de Nodos" variant="faded">
        {presetNodes &&
          presetNodes.map((node) => (
            <DropdownItem
              onPress={() => handleNodeSelect(node.type)}
              key={node.type}
            >
              <div className="flex flex-row items-center space-x-2">
                {node.icon && (
                  <Icon name={node.icon as keyof typeof dynamicIconImports} />
                )}
                <span className="text-sm">{node.label}</span>
              </div>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};
