'use client';

import { CustomNode } from '@/types';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useReactFlow } from '@xyflow/react';

interface SelectNodesProps {
  nodes: CustomNode[];
}

export const SelectNodes = ({ nodes }: SelectNodesProps) => {
  const { setNodes } = useReactFlow();

  const handleNodeSelect = (nodeType: string) => {
    const nodeData = nodes.find((node) => node.type === nodeType);
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
    <Dropdown closeOnSelect={true}>
      <DropdownTrigger>
        <Button variant="shadow" color="danger">
          Nodos
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {nodes &&
          nodes.map((node) => (
            <DropdownItem
              onClick={() => handleNodeSelect(node.type)}
              key={node.type}
            >
              <div className="flex flex-row items-center space-x-2">
                {node.data.icon && <node.data.icon />}
                <span className="text-sm">{node.data.label}</span>
              </div>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};
