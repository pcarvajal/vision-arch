import { Card, CardBody } from '@nextui-org/react';
import {
  Handle,
  Node,
  NodeProps,
  NodeResizer,
  Position,
  useReactFlow,
} from '@xyflow/react';
import { CircleX, PersonStanding } from 'lucide-react';

export interface Data extends Record<string, unknown> {
  actorName: string;
  backgroundColor?: string;
  textColor?: string;
}

export const ActorsNode = (props: NodeProps<Node<Data>>) => {
  const initialWidth = 100;
  const initialHeight = 150;
  const { setNodes, updateNodeData } = useReactFlow();
  const { actorName, backgroundColor, textColor } = props.data;
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
        className={`h-full w-full min-h-${initialHeight} min-w-${initialWidth} ${backgroundColor}`}
      >
        <CardBody className="flex flex-col items-center justify-center">
          <div className="w-full text-center text-white">
            <h1 className={`${textColor}`}>{actorName}</h1>
          </div>
          <div className="flex items-center justify-center">
            <PersonStanding className={textColor} size={60} />
          </div>
          <div className="flex items-center justify-center">
            <CircleX
              className={`h-full cursor-pointer ${textColor}`}
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
