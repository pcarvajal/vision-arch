'use client';

import { Button, Input } from '@nextui-org/react';
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';
import { PencilLine, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const CustomDefaultEdge = (props: EdgeProps) => {
  const [label, setLabel] = useState('');
  const [isLabelFocused, setIsLabelFocused] = useState(false);
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    label: edgeLabel,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  useEffect(() => {
    if (edgeLabel !== '') setLabel(edgeLabel?.toString() || '');
  }, [edgeLabel]);

  const onChangeLabel = (value: string) => {
    setLabel(value);
  };
  const onClickEditLabel = () => {
    setIsLabelFocused(true);
  };
  console;
  return (
    <>
      <BezierEdge {...props} label={undefined} />
      <EdgeLabelRenderer>
        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: labelX, top: labelY, pointerEvents: 'all' }}
        >
          {isLabelFocused && (
            <Input
              value={label}
              placeholder={'Escribe ...'}
              onValueChange={setLabel}
              onFocus={() => setIsLabelFocused(true)}
              onBlur={() => setIsLabelFocused(false)}
              onChange={(e) => onChangeLabel(e.target.value)}
              className="w-[100px]"
            />
          )}
          {!label && !isLabelFocused && (
            <Button
              className="mb-1 flex h-fit w-fit"
              radius="full"
              variant="bordered"
              onClick={onClickEditLabel}
            >
              <PencilLine size={12} />
            </Button>
          )}
          {label && !isLabelFocused && (
            <h1
              className="mb-2 text-center text-sm font-bold"
              onClick={onClickEditLabel}
            >
              {label}
            </h1>
          )}
          <Button
            isIconOnly
            radius="full"
            color="default"
            aria-label="Borrar conexión"
            className="text-sm"
            onClick={() => {
              setEdges((edges) => edges.filter((edge) => edge.id !== id));
            }}
          >
            <X />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
