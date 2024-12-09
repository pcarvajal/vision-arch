export const schema = {
  type: 'object',
  properties: {
    nodes: {
      type: 'array',
      description: 'A list of nodes in the graph.',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the node.',
          },
          type: {
            type: 'string',
            description: 'Type of the node.',
          },
          position: {
            type: 'object',
            properties: {
              x: {
                type: 'number',
                description: "X coordinate of the node's position.",
              },
              y: {
                type: 'number',
                description: "Y coordinate of the node's position.",
              },
            },
            required: ['x', 'y'],
            additionalProperties: false,
          },
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description:
                  'Unique identifier for the data associated with the node.',
              },
              type: {
                type: 'string',
                description: 'Type of the data associated with the node.',
              },
              position: {
                type: 'object',
                properties: {
                  x: {
                    type: 'number',
                    description: "X coordinate of the data's position.",
                  },
                  y: {
                    type: 'number',
                    description: "Y coordinate of the data's position.",
                  },
                },
                required: ['x', 'y'],
                additionalProperties: false,
              },
              label: {
                type: 'string',
                description: 'Label for the node.',
              },
              width: {
                type: 'number',
                description: 'Width of the node.',
              },
              height: {
                type: 'number',
                description: 'Height of the node.',
              },
              color: {
                type: 'string',
                description: 'Background color of the node.',
              },
              borderColor: {
                type: 'string',
                description: 'Border color of the node.',
              },
              zIndex: {
                type: 'number',
                description: 'Z-index of the node.',
              },
              icon: {
                type: 'string',
                description: 'Icon associated with the node.',
              },
              customData: {
                type: 'object',
                properties: {
                  textBlock: {
                    type: 'string',
                    description: 'Additional information about the node.',
                  },
                },
                required: ['textBlock'],
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
      description: 'A list of edges connecting nodes.',
      items: {
        type: 'object',
        properties: {
          source: {
            type: 'string',
            description: 'Source ID of the edge.',
          },
          target: {
            type: 'string',
            description: 'Target ID of the edge.',
          },
        },
        required: ['source', 'target'],
        additionalProperties: false,
      },
    },
  },
  required: ['nodes', 'edges'],
  additionalProperties: false,
};
