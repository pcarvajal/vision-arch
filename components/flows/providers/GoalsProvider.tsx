import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useReactFlow } from '@xyflow/react';
import {
  DiamondPlus,
  OctagonAlert,
  PackagePlus,
  Ruler,
  SquareDashedKanban,
} from 'lucide-react';

const GoalsProviderSelect = () => {
  const { setNodes } = useReactFlow();

  const getNodeData = (nodeType: GoalsNodeTypes): GoalsNodeData => {
    switch (nodeType) {
      case 'objetiveNode':
        return {
          borderColor: 'border-green-600',
        };
      case 'problemNode':
        return {
          borderColor: 'border-red-600',
        };
      case 'conceptNode':
        return {
          borderColor: 'border-purple-600',
        };
      case 'featureNode':
        return {
          borderColor: 'border-yellow-600',
        };
      case 'basicNode':
        return {
          borderColor: 'border-gray-600',
        };
      default:
        return {
          borderColor: 'border-gray-600',
        };
    }
  };

  const handleNodeSelect = (nodeType: string) => {
    const nodeData = getNodeData(nodeType as GoalsNodeTypes);
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
        <DropdownItem
          onClick={() => handleNodeSelect('objetiveNode')}
          key="objetiveNode"
        >
          <div className="flex flex-row items-center space-x-2">
            <DiamondPlus className="text-green-600" />
            <span className="text-sm">Nodo Objetivo</span>
          </div>
        </DropdownItem>
        <DropdownItem
          onClick={() => handleNodeSelect('problemNode')}
          key="problemNode"
          className="flex w-full items-center space-x-2"
        >
          <div className="flex flex-row items-center space-x-2">
            <OctagonAlert className="text-red-600" />
            <span className="text-sm">Nodo Problema</span>
          </div>
        </DropdownItem>
        <DropdownItem
          onClick={() => handleNodeSelect('conceptNode')}
          key="conceptNode"
          className="flex w-full items-center space-x-2"
        >
          <div className="flex flex-row items-center space-x-2">
            <SquareDashedKanban className="text-purple-600" />
            <span className="text-sm">Concepto de Producto</span>
          </div>
        </DropdownItem>
        <DropdownItem
          onClick={() => handleNodeSelect('featureNode')}
          key="featureNode"
          className="flex w-full items-center space-x-2"
        >
          <div className="flex flex-row items-center space-x-2">
            <PackagePlus className="text-yellow-600" />
            <span className="text-sm">Caracteristica de Producto</span>
          </div>
        </DropdownItem>
        <DropdownItem
          onClick={() => handleNodeSelect('basicNode')}
          key="basicNode"
          className="flex w-full items-center space-x-2"
        >
          <div className="flex flex-row items-center space-x-2">
            <Ruler className="border-gray-600" />
            <span className="text-sm">Nodo básico</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default GoalsProviderSelect;
