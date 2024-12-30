export const schema = {
  type: 'object',
  properties: {
    nodes: {
      type: 'array',
      description: 'A collection of node objects.',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The unique identifier for the node.',
          },
          type: {
            type: 'string',
            description: 'The type of the node.',
            enum: ['titleAndItems'],
          },
          position: {
            type: 'object',
            description: 'The position of the node in a 2D space.',
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
          zIndex: {
            type: 'number',
            description: 'Z-index position of the node.',
          },
          data: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                enum: ['principleTitleAndItemsNode'],
              },
              title: {
                type: 'string',
                description: 'The title of the node.',
              },
              titlePlaceholder: {
                type: 'string',
                description: 'Placeholder text for the title input.',
              },
              description: {
                type: 'string',
                description: 'Description of the node.',
              },
              descriptionPlaceholder: {
                type: 'string',
                description: 'Placeholder text for the description input.',
              },
              items: {
                type: 'array',
                description: 'List of items related to the node.',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'Unique identifier for the item.',
                    },
                    title: {
                      type: 'string',
                      description: 'Title of the item.',
                    },
                    type: {
                      type: 'string',
                      enum: ['TextArea'],
                    },
                    value: {
                      type: 'string',
                      description: 'Descriptive text of the item.',
                    },
                  },
                  required: ['id', 'title', 'type', 'value'],
                  additionalProperties: false,
                },
              },
              type: {
                type: 'object',
                description: 'The custom type of the node.',
                properties: {
                  id: {
                    type: 'string',
                    enum: ['titleAndItems'],
                  },
                },
                required: ['id'],
                additionalProperties: false,
              },
              label: {
                type: 'string',
                description: 'Label for the node.',
              },
              color: {
                type: 'string',
                description: 'Color of the node in hex format.',
              },
              borderColor: {
                type: 'string',
                description: 'Border color of the node in hex format.',
              },
              icon: {
                type: 'string',
                description: 'Icon associated with the node.',
              },
            },
            required: [
              'name',
              'title',
              'titlePlaceholder',
              'description',
              'descriptionPlaceholder',
              'items',
              'type',
              'label',
              'color',
              'borderColor',
              'icon',
            ],
            additionalProperties: false,
          },
        },
        required: ['id', 'type', 'position', 'data', 'style', 'zIndex'],
        additionalProperties: false,
      },
    },
    edges: {
      type: 'array',
      description: 'A collection of edge objects linking the nodes.',
      items: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
  required: ['nodes', 'edges'],
  additionalProperties: false,
};
