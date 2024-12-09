export const schema = {
  type: 'object',
  properties: {
    nodes: {
      type: 'array',
      description: 'A collection of nodes in the graph.',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the node.',
          },
          type: {
            type: 'string',
            description: 'The type of the node.',
          },
          position: {
            type: 'object',
            description: 'The position of the node in the graph.',
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
            description: 'Additional data related to the node.',
            properties: {
              id: {
                type: 'string',
                description: 'Unique identifier for the data.',
              },
              type: {
                type: 'string',
                description: 'The type of the node.',
              },
              position: {
                type: 'object',
                description: 'The position of the node in the graph.',
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
                description: 'Z-index for node stacking.',
              },
              icon: {
                type: 'string',
                description: 'Icon associated with the node.',
              },
              customData: {
                type: 'object',
                description: 'Custom data for the node.',
                properties: {
                  textBlock: {
                    type: 'string',
                    description: 'Text block for custom content.',
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
      description: 'A collection of edges connecting the nodes.',
      items: {
        type: 'object',
        properties: {
          source: {
            type: 'string',
            description: 'Unique identifier for the source node.',
          },
          target: {
            type: 'string',
            description: 'Unique identifier for the target node.',
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
