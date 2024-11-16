'use client';

import { Button, Card, CardBody } from '@nextui-org/react';
import { NodeProps, Node, Handle, Position, useReactFlow } from '@xyflow/react';
import { CircleX } from 'lucide-react';

export type ObjetiveNode = Node<
  {
    title: string;
    description: string;
  },
  'objectiveNode'
>;

const ObjectiveNode = ({
  data: { title, description },
  id,
}: NodeProps<ObjetiveNode>) => {
  const { setNodes } = useReactFlow();
  return (
    <>
      <Card isHoverable={true} className="border-2 border-green-600">
        <CardBody className="flex items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground text-zinc-500">
            {description}
          </p>

          <CircleX
            className="text-red-600 mt-2 cursor-pointer"
            onClick={() =>
              setNodes((nodes) => nodes.filter((node) => node.id !== id))
            }
          />
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </>
  );
};
export default ObjectiveNode;
