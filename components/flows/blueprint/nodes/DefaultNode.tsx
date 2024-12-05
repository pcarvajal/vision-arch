'use client';

import { BlueprintNodeTypes } from '@/types';
import { Card, CardBody, Input } from '@nextui-org/react';
import {
  Handle,
  Node,
  NodeProps,
  NodeResizer,
  Position,
  useReactFlow,
} from '@xyflow/react';
import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface Data extends Record<string, unknown> {
  backgroundColor?: string;
  height?: number;
  label?: string;
  placeholder?: string;
  textColor?: string;
  type: BlueprintNodeTypes;
  width?: number;
}

export const DefaultNode = (props: NodeProps<Node<Data>>) => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);
  const [label, setLabel] = useState('');
  const [isLabelFocused, setIsLabelFocused] = useState(false);
  const { setNodes, updateNodeData } = useReactFlow();

  const onChangeTitle = (value: string) => {
    setLabel(value);
    updateNodeData(props.id, { label: value });
  };

  const {
    height: initialHeight,
    width: initialWidth,
    backgroundColor: initialBackgroundColor,
    placeholder,
    label: initialLabel,
    textColor,
  } = props.data;

  useEffect(() => {
    if (initialHeight) {
      setWidth(initialHeight);
    }
    if (initialWidth) {
      setHeight(initialWidth);
    }
  }, [initialWidth, initialHeight]);

  useEffect(() => {
    if (initialLabel) {
      setLabel(initialLabel);
    }
  }, [initialLabel]);

  useEffect(() => {
    if (initialBackgroundColor) {
      setLabel(initialBackgroundColor);
    }
  }, [initialBackgroundColor]);

  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={width}
        minHeight={height}
      />
      <Card
        className={`h-full min-h-[${height}px] w-full min-w-[${width}px] ${initialBackgroundColor || 'bg-gray-300'}`}
      >
        <CardBody className="flex flex-col items-center justify-center">
          <div className={`w-full text-center ${textColor}`}>
            {!isLabelFocused && label && (
              <h4
                className="w-full cursor-text scroll-m-20 break-words text-xl font-semibold tracking-tight"
                onClick={() => {
                  setIsLabelFocused(true);
                }}
              >
                {label}
              </h4>
            )}
          </div>
          <div className="w-full text-center">
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
          <div className="flex items-center justify-center">
            <CircleX
              className={`mt-2 h-full cursor-pointer ${textColor}`}
              onClick={() =>
                setNodes((nodes) =>
                  nodes.filter((node) => node.id !== props.id),
                )
              }
            />
          </div>
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </>
  );
};
