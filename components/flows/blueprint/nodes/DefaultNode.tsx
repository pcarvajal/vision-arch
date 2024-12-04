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
import { Car, CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface Data extends Record<string, unknown> {
  title?: string;
  titlePlaceholder?: string;
  type?: BlueprintNodeTypes;
  backgroundColor?: string;
  textColor?: string;
}

export const defaultNode = (props: NodeProps<Node<Data>>) => {
  const initialWidth = 200;
  const initialHeight = 100;
  const [title, setTitle] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const { setNodes, updateNodeData } = useReactFlow();

  const onChangeTitle = (value: string) => {
    setTitle(value);
    updateNodeData(props.id, { title: value });
  };

  const {
    backgroundColor = 'bg-gray-800',
    titlePlaceholder,
    title: initialTitle,
    textColor,
  } = props.data;

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
    }
  }, [initialTitle]);

  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={initialWidth}
        minHeight={initialHeight}
      />
      <Card
        className={`h-full min-h-[${initialHeight}px] w-full min-w-[${initialWidth}px] ${backgroundColor}`}
      >
        <CardBody className="flex flex-col items-center justify-center">
          <div className="w-full text-center text-white">
            {!isTitleFocused && title && (
              <h4
                className="w-full cursor-text scroll-m-20 break-words text-xl font-semibold tracking-tight"
                onClick={() => {
                  setIsTitleFocused(true);
                }}
              >
                {title}
              </h4>
            )}
          </div>
          <div className="w-full text-center">
            {(isTitleFocused || !title) && (
              <Input
                value={title}
                placeholder={titlePlaceholder}
                onValueChange={setTitle}
                onFocus={() => setIsTitleFocused(true)}
                onBlur={() => setIsTitleFocused(false)}
                onChange={(e) => onChangeTitle(e.target.value)}
              />
            )}
          </div>
          <div className="flex items-center justify-center">
            <CircleX
              className="mt-2 h-full cursor-pointer text-red-600"
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
