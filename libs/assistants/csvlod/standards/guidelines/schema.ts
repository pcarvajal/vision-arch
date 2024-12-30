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
            enum: ['area', 'textBlock'],
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
            properties: {
              name: {
                type: 'string',
                description: 'The specific type of the node.',
              },
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
              type: {
                type: 'object',
                description: 'The custom type of the node.',
                properties: {
                  id: {
                    type: 'string',
                    enum: ['area', 'textBlock'],
                  },
                },
                required: ['id'],
                additionalProperties: false,
              },
              label: {
                type: 'string',
                description: 'A descriptive label for the node.',
              },
              color: {
                type: 'string',
                description: 'Background color of the node.',
              },
              borderColor: {
                type: 'string',
                description: "Color of the node's border.",
              },
              icon: {
                type: 'string',
                description: 'Icon representing the node.',
              },
            },
            required: [
              'name',
              'type',
              'textBlock',
              'textBlockPlaceholder',
              'label',
              'color',
              'borderColor',
              'icon',
              'title',
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
