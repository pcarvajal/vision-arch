'use server';
import { dbConnect } from '@/libs/mongodb';
import Company from '@/schemas/CompanySchema';
import openai from '@/libs/openAI';
import { parseStringify } from '@/libs/utils';
import { prompts } from '@/config/constants';

const { OPENAI_MODEL: modelAi } = process.env;

const generateObjetivesModel = async ({ companyId, year }: GenerateCompanyObjetivesParams) => {
  try {
    await dbConnect();
    const company = await Company.findById(companyId);
    if (!company) {
      return { message: 'Company not found', type: 'error' };
    }
    const { appContext, tasks } = prompts;
    const { businessObjetiveModel } = tasks;

    const response = await openai.chat.completions.create({
      model: modelAi as string,
      messages: [
        {
          role: 'system',
          content: appContext,
        },
        {
          role: 'user',
          content: `The company ${company.name} has the following mission: ${company.mission}. The vision is ${company.vision}. The strategic objectives are: ${company.objetives}.`,
        },
        {
          role: 'system',
          content: `${businessObjetiveModel.task.replace('{year}', year.toString())}. ${businessObjetiveModel.flowLayout} title and description for node in spanish.`,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'graph_structure',
          schema: {
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
                      enum: ['objetiveNode', 'problemNode', 'conceptNode', 'featureNode'],
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
                      },
                      required: ['title', 'description'],
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
                    },
                  },
                  required: ['id', 'source', 'target', 'animated'],
                  additionalProperties: false,
                },
              },
            },
            required: ['nodes', 'edges'],
            additionalProperties: false,
          },
          strict: true,
        },
      },
    });
    console.log(response);
    return parseStringify(response.choices[0].message.content);
  } catch (error: any) {
    console.error('Error generating react flow:', error);
    return { message: error?.message, type: 'error' };
  }
};

export { generateObjetivesModel };
