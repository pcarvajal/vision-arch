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
          type: {
            type: 'string',
            description: 'The type of the node.',
            enum: [
              'actorNode',
              'systemNode',
              'processNode',
              'dataNode',
              'infrastructureNode',
            ],
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
            description: 'Additional data associated with the node.',
            properties: {
              label: {
                type: 'string',
                description: 'Label of the node.',
              },
              textColor: {
                type: 'string',
                description: 'Color of the label node.',
                enum: ['#f8fafc', '#475569'],
              },
              backgroundColor: {
                type: 'string',
                description: 'Color of background node.',
                enum: ['#fcd34d', '#f0abfc', '#a78bfa', '#f8fafc', '#f9a8d4'],
              },
              type: {
                type: 'string',
                description: 'Type of node.',
                enum: [
                  'actorNode',
                  'systemNode',
                  'processNode',
                  'dataNode',
                  'infrastructureNode',
                ],
              },
              width: {
                type: 'number',
                description: 'Width of the node.',
              },
              height: {
                type: 'number',
                description: 'Height of the node.',
              },
              placeholder: {
                type: 'string',
                description: 'Placeholder of the node.',
              },
            },
            required: [
              'label',
              'textColor',
              'backgroundColor',
              'type',
              'width',
              'height',
              'placeholder',
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
          label: {
            type: 'string',
            description: 'Label of edge',
          },
          type: {
            type: 'string',
            description: 'The type of the edge.',
            enum: ['customDefaultEdge'],
          },
          data: {
            type: 'object',
            description: 'Additional data associated with the edge.',
            properties: {
              editLabel: {
                type: 'boolean',
                description: 'If label is editable.',
                enum: [true],
              },
            },
            required: ['editLabel'],
            additionalProperties: false,
          },
        },
        required: [
          'id',
          'source',
          'target',
          'animated',
          'type',
          'label',
          'data',
        ],
        additionalProperties: false,
      },
    },
  },
  required: ['nodes', 'edges'],
  additionalProperties: false,
};
