import { IBaseCustomData } from '@/types/reactflow';
import { Node, NodeProps, useReactFlow } from '@xyflow/react';
import { useState } from 'react';

export const useCustomNodeData = <T extends IBaseCustomData>(
  props: NodeProps<Node<T>>,
) => {
  const { data, id, type, width, height, zIndex } = props;
  const { setNodes, updateNodeData } = useReactFlow();

  const [color, setColor] = useState(data.color || '#6b7280');
  const [borderColor, setBorderColor] = useState(data.borderColor || '#18181b');
  const [backgroundColor, setBackgroundColor] = useState(
    data.backgroundColor || '#f9fafb',
  );
  const [icon, setIcon] = useState(data.icon || '');
  const [iconColor, setIconColor] = useState(data.iconColor || '#f9fafb');

  const removeNode = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return {
    id,
    data,
    type,
    width,
    height,
    zIndex,
    color,
    setColor,
    borderColor,
    setBorderColor,
    backgroundColor,
    setBackgroundColor,
    icon,
    setIcon,
    iconColor,
    setIconColor,
    removeNode,
    updateNodeData,
  };
};
