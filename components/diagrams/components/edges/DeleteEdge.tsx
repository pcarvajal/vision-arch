'use client';

import { Button } from '@nextui-org/react';
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';
import { X } from 'lucide-react';

export const DeleteEdge = (props: EdgeProps) => {
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

  return (
    <>
      <BezierEdge {...props} label={undefined} />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <Button
            isIconOnly
            radius="full"
            color="danger"
            aria-label="Borrar conexión"
            className="text-sm"
            onPress={() => {
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
