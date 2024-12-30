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
            enum: ['title'],
          },
          style: {
            type: 'object',
            description: 'Style of the node.',
            properties: {
              width: {
                type: 'number',
                description: 'Width of the node.',
              },
              height: {
                type: 'number',
                description: 'Height of the node.',
              },
            },
            required: ['width', 'height'],
            additionalProperties: false,
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
                  'actorNode',
                  'systemNode',
                  'processNode',
                  'dataNode',
                  'infrastructureNode',
                  'noteNode',
                  'basicNode',
                ],
              },
              title: {
                type: 'string',
                description: 'Title of the node.',
              },
              titlePlaceholder: {
                type: 'string',
                description: 'Placeholder for the title.',
              },
              type: {
                type: 'object',
                description: 'The custom type of the node.',
                properties: {
                  id: {
                    type: 'string',
                    enum: ['title'],
                  },
                },
                required: ['id'],
                additionalProperties: false,
              },
              label: {
                type: 'string',
              },
              color: {
                type: 'string',
              },
              backgroundColor: {
                type: 'string',
              },
              icon: {
                type: 'string',
              },
              figure: {
                type: 'string',
                description: 'Icon name of Lucide Icons, in kebab case',
              },
              iconColor: {
                type: 'string',
              },
            },
            required: [
              'name',
              'title',
              'titlePlaceholder',
              'type',
              'label',
              'color',
              'backgroundColor',
              'icon',
              'figure',
              'iconColor',
            ],
            additionalProperties: false,
          },
        },
        required: ['id', 'type', 'position', 'data', 'style'],
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
            enum: ['deleteEdge'],
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
