'use client';

import useFlowStore from '@/store/flow/flowStore';
import { ITitleAndItemsNodeProps } from '@/types/reactflow';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
} from '@nextui-org/react';
import { Node, NodeProps, NodeResizer } from '@xyflow/react';
import { X } from 'lucide-react';
import { useRef, useState } from 'react';

type TitleAndItemsNodeData = Node<ITitleAndItemsNodeProps>;

export const TitleAndItems = (props: NodeProps<TitleAndItemsNodeData>) => {
  const { removeNode, updateNode } = useFlowStore((state) => state);

  const {
    height,
    width,
    id,
    data: { description, items, title },
  } = props;
  const [titleFocused, setTitleFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);

  const itemRefs = useRef<{
    [key: string]: HTMLInputElement | HTMLTextAreaElement | null;
  }>({});

  const handleInputChange = (value: string, id: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, value } : item,
    );
    updateNode(id, { items: newItems });
  };

  const handleInputHeaderChange = (value: string, id: string) => {
    if (id === 'title') {
      updateNode(id, { title: value });
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
        minWidth={242}
        minHeight={111}
        /*         onResize={(e, size) => {
          setWidth(size.width);
          setHeight(size.height);
        }} */
      />
      <Card
        className={`h-full w-full`}
        style={{
          minWidth: 242,
          minHeight: 111,
          height,
          width,
        }}
      >
        <CardBody className="h-full w-full">
          <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
            <X
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => removeNode(id)}
            />
            {title && !titleFocused ? (
              <p className="font-bold" onClick={() => setTitleFocused(true)}>
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
          <CardBody className="w-full px-4 py-2">
            <div className="list-inside list-disc space-y-1">
              {items &&
                items.map((item) =>
                  focusedItemId === item.id ? (
                    item.type === 'Input' ? (
                      <Input
                        key={`${item.id}-input`}
                        id={item.id}
                        label={item.title}
                        value={item.value}
                        ref={(el) => {
                          itemRefs.current[item.id] = el;
                        }}
                        onChange={(e) =>
                          handleInputChange(e.target.value, item.id)
                        }
                        onBlur={handleItemBlur}
                      />
                    ) : (
                      <Textarea
                        key={`${item.id}-textArea`}
                        id={item.id}
                        label={item.title}
                        value={item.value}
                        ref={(el) => {
                          itemRefs.current[item.id] = el;
                        }}
                        onChange={(e) =>
                          handleInputChange(e.target.value, item.id)
                        }
                        onBlur={handleItemBlur}
                      />
                    )
                  ) : (
                    <ul key={`${item.id}-ul`}>
                      <li
                        key={`${item.id}-li`}
                        onClick={() => handleItemFocus(item.id)}
                        className="flex flex-col space-x-2"
                      >
                        <p className="font-bold">{item.title}</p>
                        <p>{item.value}</p>
                      </li>
                      {item.id !== items[items.length - 1].id && (
                        <Divider className="my-4" key={`${item.id}-divider`} />
                      )}
                    </ul>
                  ),
                )}
            </div>
          </CardBody>
        </CardBody>
      </Card>
    </>
  );
};
