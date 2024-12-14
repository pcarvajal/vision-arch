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
              type: {
                type: 'string',
                description: 'The specific type of the node.',
              },
              nodeData: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'The title of the node.',
                  },
                  textBlock: {
                    type: 'string',
                    description: 'Text content for text block nodes.',
                  },
                  textBlockPlaceholder: {
                    type: 'string',
                    description:
                      'Placeholder text for input fields within text blocks.',
                  },
                },
                required: ['title', 'textBlock', 'textBlockPlaceholder'],
                additionalProperties: false,
              },
              nodeBaseType: {
                type: 'string',
                description: 'Base type category for nodes.',
              },
              label: {
                type: 'string',
                description: 'A descriptive label for the node.',
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
                description: 'Background color of the node.',
              },
              borderColor: {
                type: 'string',
                description: "Color of the node's border.",
              },
              zIndex: {
                type: 'number',
                description: 'Layering order of the node.',
              },
              icon: {
                type: 'string',
                description: 'Icon representing the node.',
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
