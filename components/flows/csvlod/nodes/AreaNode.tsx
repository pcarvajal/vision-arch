import { Card } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer, Position } from '@xyflow/react';

export interface Data extends Record<string, unknown> {}

export const AreaNode = (props: NodeProps<Node<Data>>) => {
  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={100}
        minHeight={100}
      />
      <Card
        className={`h-full w-full border-2 border-purple-900 bg-purple-400 opacity-50`}
        style={{
          minWidth: 100,
          minHeight: 100,
        }}
      >
        <p className="text-center text-white">Area</p>
      </Card>
    </>
  );
};
