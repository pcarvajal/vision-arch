export const schema = {
  type: 'object',
  properties: {
    nodes: {
      type: 'array',
      description: 'A collection of node objects.',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The unique identifier for the node.',
          },
          type: {
            type: 'string',
            description: 'The type of the node.',
          },
          position: {
            type: 'object',
            description: 'The position of the node in a 2D space.',
            properties: {
              x: {
                type: 'number',
                description: 'The x-coordinate of the node.',
              },
              y: {
                type: 'number',
                description: 'The y-coordinate of the node.',
              },
            },
            required: ['x', 'y'],
            additionalProperties: false,
          },
          data: {
            type: 'object',
            description: 'Additional data associated with the node.',
            properties: {
              id: {
                type: 'string',
                description: "The unique identifier matching the node's ID.",
              },
              type: {
                type: 'string',
                description:
                  "The type of the node, must match the node's type.",
              },
              position: {
                type: 'object',
                description: 'The position of the node.',
                properties: {
                  x: {
                    type: 'number',
                    description: 'The x-coordinate of the node.',
                  },
                  y: {
                    type: 'number',
                    description: 'The y-coordinate of the node.',
                  },
                },
                required: ['x', 'y'],
                additionalProperties: false,
              },
              label: {
                type: 'string',
                description: 'A label for the node.',
              },
              width: {
                type: 'number',
                description: 'The width of the node.',
              },
              height: {
                type: 'number',
                description: 'The height of the node.',
              },
              color: {
                type: 'string',
                description: 'The background color of the node.',
              },
              borderColor: {
                type: 'string',
                description: "The color of the node's border.",
              },
              zIndex: {
                type: 'number',
                description: 'The stacking order of the node.',
              },
              icon: {
                type: 'string',
                description: 'An optional icon for the node.',
              },
              customData: {
                type: 'object',
                description: 'Custom data specific to the node.',
                properties: {
                  title: {
                    type: 'string',
                    description: 'The title of the custom data.',
                  },
                  description: {
                    type: 'string',
                    description: 'A description of the custom data.',
                  },
                  items: {
                    type: 'array',
                    description: 'A list of items related to the custom data.',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          description: 'The unique identifier for the item.',
                        },
                        title: {
                          type: 'string',
                          description: 'The title of the item.',
                        },
                        type: {
                          type: 'string',
                          description: 'The type of the item.',
                        },
                        value: {
                          type: 'string',
                          description: 'The value associated with the item.',
                        },
                      },
                      required: ['id', 'title', 'type', 'value'],
                      additionalProperties: false,
                    },
                  },
                },
                required: ['title', 'description', 'items'],
                additionalProperties: false,
              },
            },
            required: [
              'id',
              'type',
              'position',
              'label',
              'width',
              'height',
              'color',
              'borderColor',
              'zIndex',
              'icon',
              'customData',
            ],
            additionalProperties: false,
          },
        },
        required: ['id', 'type', 'position', 'data'],
        additionalProperties: false,
      },
    },
    edges: {
      type: 'array',
      description: 'A collection of edge objects linking the nodes.',
      items: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
  required: ['nodes', 'edges'],
  additionalProperties: false,
};
