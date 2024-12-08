'use client';

import { Card, CardBody, CardHeader, Input, Textarea } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { useRef, useState } from 'react';

export interface TitleAndItemsNodeData extends Record<string, unknown> {
  title: string;
  description: string;
  items: Array<{
    id: string;
    title: string;
    type: 'TextArea' | 'Input';
    value: string;
  }>;
}

export const TitleAndItemsNode = (
  props: NodeProps<Node<TitleAndItemsNodeData>>,
) => {
  const [titleFocused, setTitleFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);

  const itemRefs = useRef<{
    [key: string]: HTMLInputElement | HTMLTextAreaElement | null;
  }>({});

  const { updateNodeData } = useReactFlow();
  const { title, description, items } = props.data
    .customData as TitleAndItemsNodeData;

  const handleInputChange = (value: string, id: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, value } : item,
    );
    updateNodeData(props.id, {
      customData: { title, description, items: newItems },
    });
  };

  const handleInputHeaderChange = (value: string, id: string) => {
    if (id === 'title') {
      updateNodeData(props.id, {
        customData: { title: value, description, items },
      });
    }
    if (id === 'description') {
      updateNodeData(props.id, {
        customData: { title, description: value, items },
      });
    }
  };

  const handleItemFocus = (id: string) => {
    setFocusedItemId(id);
  };

  const handleItemBlur = () => {
    setFocusedItemId(null);
  };

  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={80}
        minHeight={80}
      />
      <Card
        className={`h-full w-full`}
        style={{
          minWidth: 80,
          minHeight: 80,
        }}
      >
        <CardBody className="w-50 h-300">
          <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
            {title && !titleFocused ? (
              <p
                className="font-bold uppercase"
                onClick={() => setTitleFocused(true)}
              >
                {title}
              </p>
            ) : (
              <Input
                id="title"
                label="Titulo"
                className="w-full"
                value={title}
                onFocus={() => setTitleFocused(true)}
                onBlur={() => setTitleFocused(false)}
                onChange={(e) =>
                  handleInputHeaderChange(e.target.value, 'title')
                }
              />
            )}
            {description && !descriptionFocused ? (
              <small
                className="text-default-500"
                onClick={() => setDescriptionFocused(true)}
              >
                {description}
              </small>
            ) : (
              <Input
                id="description"
                label="Descripción"
                className="w-full"
                value={description}
                onFocus={() => setDescriptionFocused(true)}
                onBlur={() => setDescriptionFocused(false)}
                onChange={(e) =>
                  handleInputHeaderChange(e.target.value, 'description')
                }
              />
            )}
          </CardHeader>
          <CardBody className="px-4 py-2">
            <ul className="max-w-md list-inside list-disc space-y-1">
              {items &&
                items.map((item) => (
                  <li>
                    {focusedItemId === item.id ? (
                      item.type === 'Input' ? (
                        <Input
                          id={item.id}
                          label={item.title}
                          value={item.value}
                          ref={(el) => (itemRefs.current[item.id] = el)}
                          onChange={(e) =>
                            handleInputChange(e.target.value, item.id)
                          }
                          onBlur={handleItemBlur}
                        />
                      ) : (
                        <Textarea
                          id={item.id}
                          label={item.title}
                          value={item.value}
                          ref={(el) => (itemRefs.current[item.id] = el)}
                          onChange={(e) =>
                            handleInputChange(e.target.value, item.id)
                          }
                          onBlur={handleItemBlur}
                        />
                      )
                    ) : (
                      <div onClick={() => handleItemFocus(item.id)}>
                        <span>{item.title}: </span>
                        {item.value && <p>{item.value}</p>}
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </CardBody>
        </CardBody>
      </Card>
    </>
  );
};
