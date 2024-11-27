'use client';

import { Card, CardBody, Input, Textarea } from '@nextui-org/react';
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
  title?: string;
  description?: string;
  type: GoalsNodeTypes;
  borderColor?: string;
}

export const DefaultNode = (props: NodeProps<Node<Data>>) => {
  const { setNodes } = useReactFlow();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const {
    title: initialTitle,
    description: initialDescription,
    type = 'basicNode',
    borderColor = 'border-gray-600',
  } = props.data;

  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
    if (initialDescription) setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  return (
    <div className="flex h-full">
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={80}
        minHeight={50}
      />
      <Card isHoverable={true} className={`w-full border-2 ${borderColor}`}>
        <CardBody className="flex w-full flex-col">
          <div className="flex flex-col gap-2">
            <div className="w-full text-center">
              {' '}
              {!isTitleFocused && title && (
                <h4
                  className="w-full cursor-text scroll-m-20 break-words text-xl font-semibold tracking-tight"
                  onClick={() => {
                    setIsTitleFocused(true);
                    setIsDescriptionFocused(false);
                  }}
                >
                  {title}
                </h4>
              )}
              {(isTitleFocused || !title) && (
                <Input
                  value={title}
                  placeholder="Nueva característica"
                  onValueChange={setTitle}
                  onFocus={() => setIsTitleFocused(true)}
                  onBlur={() => setIsTitleFocused(false)}
                />
              )}
            </div>
            <div className="w-full text-center">
              {!isDescriptionFocused && description && (
                <p
                  className="text-muted-foreground w-full cursor-text break-words text-sm text-zinc-500"
                  onClick={() => {
                    setIsDescriptionFocused(true);
                    setIsTitleFocused(false);
                  }}
                >
                  {description}
                </p>
              )}
              {(isDescriptionFocused || !description) && (
                <Textarea
                  value={description}
                  placeholder="Descripción ..."
                  onValueChange={setDescription}
                  onFocus={() => setIsDescriptionFocused(true)}
                  onBlur={() => setIsDescriptionFocused(false)}
                  className="flex h-full"
                />
              )}
            </div>
          </div>
          <div className="mt-auto flex justify-center">
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
    </div>
  );
};
