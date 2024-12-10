'use client';

import { CustomNodeData } from '@/types';
import { Card, CardBody, Input } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

type VerticalTitleNodeData = {
  placeholder: string;
};

export const VerticalTitleNode = (
  props: NodeProps<Node<CustomNodeData<VerticalTitleNodeData>>>,
) => {
  const {
    width: initialWidth,
    height: initialHeight,
    label: initialLabel = 'Texto',
    nodeData: { placeholder },
  } = props.data;

  const { setNodes, updateNodeData, updateNode } = useReactFlow();

  const [label, setLabel] = useState('');
  const [isLabelFocused, setIsLabelFocused] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  const onChangeTitle = (value: string) => {
    setLabel(value);
    updateNodeData(props.id, { label: value });
  };

  useEffect(() => {
    if (initialLabel) {
      setLabel(initialLabel);
    }
  }, [initialLabel]);

  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={80}
        minHeight={80}
        onResize={(event, params) => {
          const { width, height, x, y } = params;
          setDimensions({ width, height });
          updateNodeData(props.id, { width, height });
          updateNode(props.id, { position: { x, y } });
        }}
      />
      <Card
        className={`h-full w-full`}
        style={{
          minWidth: 80,
          minHeight: 80,
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        <CardBody>
          <div className="absolute right-0 top-0 p-2">
            <X
              className="cursor-pointer"
              size={15}
              onClick={() => {
                setNodes((nodes) =>
                  nodes.filter((node) => node.id !== props.id),
                );
              }}
            />
          </div>
          <div className="flex h-full w-full items-center justify-center">
            {!isLabelFocused && label && (
              <h2
                className="-rotate-90 whitespace-nowrap text-center"
                onClick={() => {
                  setIsLabelFocused(true);
                }}
              >
                {label}
              </h2>
            )}
            {(isLabelFocused || !label) && (
              <Input
                value={label}
                placeholder={placeholder}
                onValueChange={setLabel}
                onFocus={() => setIsLabelFocused(true)}
                onBlur={() => setIsLabelFocused(false)}
                onChange={(e) => onChangeTitle(e.target.value)}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};
