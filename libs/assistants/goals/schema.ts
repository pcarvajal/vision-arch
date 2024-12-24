export const schema = {
  type: 'object',
  properties: {
    nodes: {
      type: 'array',
      description: 'An array of nodes in the graph.',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the node.',
          },
          width: {
            type: 'number',
            description: 'Width of the node.',
          },
          height: {
            type: 'number',
            description: 'Height of the node.',
          },
          type: {
            type: 'string',
            description: 'The type of the node.',
            enum: ['titleAndDescription'],
          },
          position: {
            type: 'object',
            description: 'The position of the node in a 2D space.',
            properties: {
              x: {
                type: 'number',
                description: 'X coordinate of the node position.',
              },
              y: {
                type: 'number',
                description: 'Y coordinate of the node position.',
              },
            },
            required: ['x', 'y'],
            additionalProperties: false,
          },
          data: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                enum: [
                  'objetiveNode',
                  'problemNode',
                  'conceptNode',
                  'featureNode',
                  'noteNode',
                  'basicNode',
                ],
              },
              title: {
                type: 'string',
                description: 'Title of the node.',
              },
              description: {
                type: 'string',
                description: 'Description of the node.',
              },
              type: {
                type: 'object',
                description: 'The custom type of the node.',
                properties: {
                  id: {
                    type: 'string',
                    enum: ['titleAndDescription'],
                  },
                },
                required: ['id'],
                additionalProperties: false,
              },
              label: {
                type: 'string',
                description: 'Label associated with the node.',
              },
              icon: {
                type: 'string',
                description: 'Icon name associated with the node.',
              },
              iconColor: {
                type: 'string',
                description: 'Hex color value for the icon.',
              },
              borderColor: {
                type: 'string',
                description: 'Hex color value for the border.',
              },
            },
            required: [
              'name',
              'type',
              'label',
              'icon',
              'iconColor',
              'borderColor',
              'title',
              'description',
            ],
            additionalProperties: false,
          },
        },
        required: ['id', 'width', 'height', 'type', 'position', 'data'],
        additionalProperties: false,
      },
    },
    edges: {
      type: 'array',
      description: 'An array of edges connecting nodes in the graph.',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the edge.',
          },
          source: {
            type: 'string',
            description: 'The ID of the source node.',
          },
          target: {
            type: 'string',
            description: 'The ID of the target node.',
          },
          animated: {
            type: 'boolean',
            description: 'Indicates whether the edge is animated.',
            enum: [true],
          },
          type: {
            type: 'string',
            description: 'The type of the edge.',
            enum: ['deleteEdge'],
          },
          data: {
            type: 'object',
            description: 'Additional data associated with the edge.',
            properties: {
              editLabel: {
                type: 'boolean',
                description: 'If label is editable.',
                enum: [false],
              },
            },
            required: ['editLabel'],
            additionalProperties: false,
          },
        },
        required: ['id', 'source', 'target', 'animated', 'type', 'data'],
        additionalProperties: false,
      },
    },
  },
  required: ['nodes', 'edges'],
  additionalProperties: false,
};
