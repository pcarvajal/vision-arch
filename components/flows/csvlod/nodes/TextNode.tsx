import { Card, CardBody } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer } from '@xyflow/react';

export interface Data extends Record<string, unknown> {
  width?: number;
  height?: number;
}

export const TextNode = (props: NodeProps<Node<Data>>) => {
  const { width = 100, height = 100 } = props.data;
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
        className={`h-full w-full`}
        style={{
          minWidth: width,
          minHeight: height,
        }}
      >
        <CardBody>
          <div>
            <h2>Text</h2>
            <p>Text node</p>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
