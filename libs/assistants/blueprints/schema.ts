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
            properties: {
              type: {
                type: 'string',
                enum: [
                  'actorNode',
                  'systemNode',
                  'processNode',
                  'dataNode',
                  'infrastructureNode',
                ],
              },
              nodeData: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Title of the node.',
                  },
                  titlePlaceholder: {
                    type: 'string',
                    description: 'Placeholder for the title.',
                  },
                },
                required: ['titlePlaceholder', 'title'],
                additionalProperties: false,
              },
              nodeBaseType: {
                type: 'string',
                enum: ['BaseNodeTypeEnum.TITLE_ICON', 'BaseNodeTypeEnum.TITLE'],
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
              iconColor: {
                type: 'string',
              },
              width: {
                type: 'number',
              },
              height: {
                type: 'number',
              },
            },
            required: [
              'type',
              'nodeData',
              'nodeBaseType',
              'label',
              'color',
              'backgroundColor',
              'icon',
              'iconColor',
              'width',
              'height',
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
