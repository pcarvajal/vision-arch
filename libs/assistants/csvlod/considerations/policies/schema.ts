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
            enum: ['area', 'title', 'textBlock'],
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
          width: {
            type: 'number',
            description: 'Width of the node.',
          },
          height: {
            type: 'number',
            description: 'Height of the node.',
          },
          data: {
            type: 'object',
            description: 'Representation of a policy node.',
            properties: {
              name: {
                type: 'string',
                description: 'The type of the policy node.',
              },
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
              type: {
                type: 'object',
                description: 'The custom type of the node.',
                properties: {
                  id: {
                    type: 'string',
                    enum: ['area', 'textBlock', 'title'],
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
        required: ['id', 'type', 'position', 'data', 'width', 'height'],
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
