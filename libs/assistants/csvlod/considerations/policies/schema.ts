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
            enum: ['area', 'textBlock', 'titleVertical'],
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
          data: {
            type: 'object',
            description: 'Representation of a policy node.',
            properties: {
              name: {
                type: 'string',
                description: 'The type of node.',
                enum: [
                  'policyTypeAreaNode',
                  'policyAreaNode',
                  'policyDescriptionAreaNode',
                  'policyTypeLabelNode',
                  'policyTextBlockNode',
                  'policyDescriptionTextBlockNode',
                ],
              },
              title: {
                type: 'string',
                description: 'Title of the node.',
              },
              titlePlaceholder: {
                type: 'string',
                description: 'Placeholder text for the title of the node.',
              },
              textBlock: {
                type: 'string',
                description: 'Text content for node.',
              },
              textBlockPlaceholder: {
                type: 'string',
                description: 'Placeholder text for node.',
              },
              type: {
                type: 'object',
                description: 'The custom type of the node.',
                properties: {
                  id: {
                    type: 'string',
                    enum: ['area', 'textBlock', 'titleVertical'],
                  },
                },
                required: ['id'],
                additionalProperties: false,
              },
              label: {
                type: 'string',
                description: 'Label associated with the node.',
              },
              color: {
                type: 'string',
                description: 'Background color of the node.',
              },
              borderColor: {
                type: 'string',
                description: 'Border color of the node.',
              },
              icon: {
                type: 'string',
                description: 'Icon representation for the node.',
              },
            },
            required: [
              'name',
              'title',
              'titlePlaceholder',
              'textBlock',
              'textBlockPlaceholder',
              'type',
              'label',
              'color',
              'borderColor',
              'icon',
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
