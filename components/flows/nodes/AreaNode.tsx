import { Card, CardBody, Input } from '@nextui-org/react';
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useReactFlow,
  NodeResizeControl,
  NodeResizer,
} from '@xyflow/react';
import { CircleX, Scaling } from 'lucide-react';
import { useState } from 'react';

const AreaNode = (props: NodeProps<Node<{}, 'areaNode'>>) => {
  const { setNodes } = useReactFlow();
  const [title, setTitle] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  return (
    <>
      <NodeResizer
        lineStyle={{ borderWidth: '2px', borderStyle: 'dashed', borderColor: '#9333ea' }}
        minWidth={100}
        minHeight={50}
      />
      <Handle type="target" position={Position.Left} />
      <Card className="flex h-full">
        <CardBody className="flex items-center justify-between">
          {!isTitleFocused && title && (
            <h4
              className="cursor-text scroll-m-20 text-xl font-semibold tracking-tight"
              onClick={() => {
                setIsTitleFocused(true);
              }}
            >
              {title}
            </h4>
          )}
          {(isTitleFocused || !title) && (
            <Input
              value={title}
              placeholder="Nuevo objetivo"
              onValueChange={setTitle}
              className={`scroll-m-20 text-xl font-semibold tracking-tight`}
              onFocus={() => setIsTitleFocused(true)}
              onBlur={() => setIsTitleFocused(false)}
            />
          )}
          <CircleX
            className="mt-2 cursor-pointer text-red-600"
            onClick={() => setNodes((nodes) => nodes.filter((node) => node.id !== props.id))}
          />
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default AreaNode;
