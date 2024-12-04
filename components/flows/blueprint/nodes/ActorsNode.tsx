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
  const { setNodes, updateNodeData } = useReactFlow();
  const { actorName, backgroundColor, textColor } = props.data;
  return (
    <div
      className="flex h-full max-w-full"
      style={{
        minWidth: '100px',
        minHeight: '150px',
      }}
    >
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={100}
        minHeight={150}
      />
      <Card isHoverable={false} className={`w-[100px] grow ${backgroundColor}`}>
        <CardBody>
          <div className={`flex flex-col`}>
            <div className="flex flex-col items-center justify-center">
              <h1 className={`${textColor}`}>{actorName}</h1>
              <PersonStanding className={textColor} size={60} />
            </div>
            <div className="mt-4 flex flex-col items-center justify-center">
              <CircleX
                className={`h-full cursor-pointer ${textColor}`}
                onClick={() =>
                  setNodes((nodes) =>
                    nodes.filter((node) => node.id !== props.id),
                  )
                }
              />
            </div>
          </div>
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};
