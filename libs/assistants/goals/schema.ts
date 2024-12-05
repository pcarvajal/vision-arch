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
              'objetiveNode',
              'problemNode',
              'conceptNode',
              'featureNode',
              'basicNode',
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
              title: {
                type: 'string',
                description: 'Title of the node.',
              },
              description: {
                type: 'string',
                description: 'Description of the node.',
              },
              borderColor: {
                type: 'string',
                description: 'Color of node.',
                enum: [
                  'border-green-600',
                  'border-red-600',
                  'border-purple-600',
                  'border-yellow-600',
                  'border-gray-600',
                ],
              },
              type: {
                type: 'string',
                description: 'Type of node.',
                enum: [
                  'objetiveNode',
                  'problemNode',
                  'conceptNode',
                  'featureNode',
                  'basicNode',
                ],
              },
            },
            required: ['title', 'description', 'borderColor', 'type'],
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
