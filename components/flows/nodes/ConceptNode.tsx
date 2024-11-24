import { Card, CardBody, Input } from '@nextui-org/react';
import { Handle, Node, NodeProps, Position, useReactFlow, NodeResizer } from '@xyflow/react';
import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Data extends Record<string, unknown> {
  title?: string;
}

const ConceptNode = (props: NodeProps<Node<Data, 'conceptNode'>>) => {
  const { setNodes } = useReactFlow();
  const [title, setTitle] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const { title: initialTitle } = props.data;
  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
  }, [initialTitle]);

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
              placeholder="Nuevo concepto"
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

export default ConceptNode;
