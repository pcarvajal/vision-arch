'use client';

import { Card, CardBody, Input, Textarea } from '@nextui-org/react';
import { NodeProps, Node, Handle, Position, useReactFlow } from '@xyflow/react';
import { CircleX } from 'lucide-react';
import { useState } from 'react';

const ProblemNode = (props: NodeProps<Node<{}, 'problemNode'>>) => {
  const { setNodes } = useReactFlow();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  return (
    <>
      <Card isHoverable={true} className="border-2 border-red-600">
        <CardBody className="flex items-center">
          {!isTitleFocused && title && (
            <h4
              className="cursor-text scroll-m-20 text-xl font-semibold tracking-tight"
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
              placeholder="Nuevo problema"
              onValueChange={setTitle}
              className={`scroll-m-20 text-xl font-semibold tracking-tight`}
              onFocus={() => setIsTitleFocused(true)}
              onBlur={() => setIsTitleFocused(false)}
            />
          )}
          {!isDescriptionFocused && description && (
            <p
              className="text-muted-foreground cursor-text text-sm text-zinc-500"
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
            />
          )}
          <CircleX
            className="mt-2 cursor-pointer text-red-600"
            onClick={() => setNodes((nodes) => nodes.filter((node) => node.id !== props.id))}
          />
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </>
  );
};
export default ProblemNode;
