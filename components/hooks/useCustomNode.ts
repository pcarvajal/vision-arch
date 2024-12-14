import { CustomNodeData } from '@/types';
import { Node, NodeProps, useReactFlow } from '@xyflow/react';
import { useEffect, useState } from 'react';

export const useCustomNodeData = <T extends CustomNodeData>(
  props: NodeProps<Node<T>>,
) => {
  const { data, id } = props;
  const { setNodes } = useReactFlow();

  const [width, setWidth] = useState(data.width || 200);
  const [height, setHeight] = useState(data.height || 200);
  const [color, setColor] = useState(data.color || '#6b7280');
  const [borderColor, setBorderColor] = useState(data.borderColor || '#18181b');
  const [nodeData, setNodeData] = useState<T['nodeData']>(
    data.nodeData as T['nodeData'],
  );
  const [zIndex, setZIndex] = useState(data.zIndex || 0);
  const [backgroundColor, setBackgroundColor] = useState(
    data.backgroundColor || '#f9fafb',
  );
  const [icon, setIcon] = useState(data.icon || '');
  const [iconColor, setIconColor] = useState(data.iconColor || '#f9fafb');
  const [description, setDescription] = useState(data.description || '');
  const [label, setLabel] = useState(data.label || '');
  const [nodeBaseType, setNodeBaseType] = useState(data.nodeBaseType || '');
  const [type, setType] = useState(data.type || '');

  console.log('useCustomNodeData', nodeData);

  // Método para actualizar nodos globalmente en React Flow
  const updateNodeData = () => {
    console.log('updateNodeData');
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                width,
                height,
                color,
                borderColor,
                nodeData,
                zIndex,
                backgroundColor,
                icon,
                iconColor,
                description,
                label,
                nodeBaseType,
                type,
              },
            }
          : node,
      ),
    );
  };

  // Sincronizar cambios locales con React Flow
  useEffect(() => {
    updateNodeData();
  }, [
    width,
    height,
    color,
    borderColor,
    backgroundColor,
    zIndex,
    backgroundColor,
    backgroundColor,
    borderColor,
    icon,
    iconColor,
    description,
    label,
    nodeBaseType,
    type,
    nodeData,
  ]);

  // Método para eliminar nodo
  const removeNode = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return {
    id,
    type,
    setType,
    nodeBaseType,
    setNodeBaseType,
    label,
    setLabel,
    description,
    setDescription,
    width,
    setWidth,
    height,
    setHeight,
    color,
    setColor,
    borderColor,
    setBorderColor,
    backgroundColor,
    setBackgroundColor,
    zIndex,
    setZIndex,
    icon,
    setIcon,
    iconColor,
    setIconColor,
    nodeData,
    setNodeData,
    removeNode,
  };
};
