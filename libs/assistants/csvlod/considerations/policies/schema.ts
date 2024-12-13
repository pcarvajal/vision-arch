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
            description: 'Representation of a policy node.',
            properties: {
              type: {
                type: 'string',
                description: 'The type of the policy node.',
              },
              nodeData: {
                type: 'object',
                description: 'Data specific to the policy node.',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Title of the policy',
                  },
                  titlePlaceholder: {
                    type: 'string',
                    description:
                      'Placeholder text for the title, used in title nodes.',
                  },
                  textBlock: {
                    type: 'string',
                    description: 'Text content for text block nodes.',
                  },
                  textBlockPlaceholder: {
                    type: 'string',
                    description: 'Placeholder text for the text block.',
                  },
                },
                required: [
                  'title',
                  'titlePlaceholder',
                  'textBlock',
                  'textBlockPlaceholder',
                ],
                additionalProperties: false,
              },
              nodeBaseType: {
                type: 'string',
                description:
                  'The base type of the node, indicating structural category.',
              },
              label: {
                type: 'string',
                description: 'Label associated with the node.',
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
                anyOf: [
                  {
                    type: 'number',
                    description: 'Z-index for stacking order.',
                  },
                  {
                    type: 'null',
                    description: 'Indicates no specific z-index.',
                  },
                ],
              },
              icon: {
                type: 'string',
                description: 'Icon representation for the node.',
              },
            },
            required: [
              'type',
              'nodeData',
              'nodeBaseType',
              'label',
              'width',
              'height',
              'color',
              'borderColor',
              'zIndex',
              'icon',
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
