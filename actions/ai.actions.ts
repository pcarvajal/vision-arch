'use server';

import { getBlueprintsModelMessages } from '@/libs/assistants/blueprints/messages';
import { getCsvlodConsiderationsPoliciesModel } from '@/libs/assistants/csvlod/considerations/policies/messages';
import { getCsvlodConsiderationsPrinciplesModel } from '@/libs/assistants/csvlod/considerations/principles/messages';
import { getBusinessObjetiveModelMessages } from '@/libs/assistants/goals/messages';
import { databases } from '@/libs/backend/databases';
import openai from '@/libs/openAI';
import { parseStringify } from '@/libs/utils';
import { GenerateArtifactParams } from '@/types';
import { Company, ModelMessagesProps } from '@/types/types';
import { ChatCompletionMessageParam } from 'openai/resources';
import { schema as blueprintsSchema } from '../libs/assistants/blueprints/schema';
import { schema as policiesSchema } from '../libs/assistants/csvlod/considerations/policies/schema';
import { schema as principlesSchema } from '../libs/assistants/csvlod/considerations/principles/schema';
import { schema as guidelinesSchema } from '../libs/assistants/csvlod/standards/guidelines/schema';
import { schema as goalsSchema } from '../libs/assistants/goals/schema';

const {
  APPWRITE_DATABASE_ID: databaseId,
  APPWRITE_COMPANIES_ID: companiesId,
  OPENAI_MODEL: modelAi,
} = process.env;

const generateBlueprintsModel = async ({
  companyId,
  year,
}: GenerateArtifactParams) => {
  try {
    const company = await databases.getDocument<Company>(
      databaseId!,
      companiesId!,
      companyId,
    );

    if (!company) {
      return { message: 'Company not found', type: 'error' };
    }

    const { name, mission, vision, description, objetives } = company;

    const response = await openai.chat.completions.create({
      model: modelAi as string,
      messages: getBlueprintsModelMessages({
        name,
        mission,
        vision,
        objetives,
        description,
        year: year.toString(),
      }),
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'graph_structure',
          schema: blueprintsSchema,
          strict: true,
        },
      },
    });
    return parseStringify(response.choices[0].message.content);
  } catch (error: any) {
    console.error('Error generating react flow:', error);
    return { message: error?.message, type: 'error' };
  }
};

const generateGoalsModel = async ({
  companyId,
  year,
}: GenerateArtifactParams) => {
  try {
    const company = await databases.getDocument(
      databaseId!,
      companiesId!,
      companyId,
    );

    if (!company) {
      return { message: 'Company not found', type: 'error' };
    }

    const response = await openai.chat.completions.create({
      model: modelAi as string,
      messages: getBusinessObjetiveModelMessages(
        company.name,
        company.mission,
        company.vision,
        company.objetives,
        year.toString(),
      ),
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'graph_structure',
          schema: goalsSchema,
          strict: true,
        },
      },
    });
    return parseStringify(response.choices[0].message.content);
  } catch (error: any) {
    console.error('Error generating react flow:', error);
    return { message: error?.message, type: 'error' };
  }
};

const generateCsvlodModel = async ({
  companyId,
  year,
  type,
}: GenerateArtifactParams) => {
  try {
    if (!type) {
      return { message: 'Tipo de artefacto no encontrado.', type: 'error' };
    }

    const company = await databases.getDocument<Company>(
      databaseId!,
      companiesId!,
      companyId,
    );

    if (!company) {
      return { message: 'Company not found', type: 'error' };
    }
    const { name, mission, vision, description, objetives } = company;

    const response = await openai.chat.completions.create({
      model: modelAi as string,
      messages: getCsvlodModelMessages(type, {
        name,
        mission,
        vision,
        objetives,
        description,
        year: year.toString(),
      }),

      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'graph_structure',
          schema: getCsvlodSchema(type),
          strict: true,
        },
      },
    });
    return parseStringify(response.choices[0].message.content);
  } catch (error: any) {
    console.error('Error generating react flow:', error);
    return { message: error?.message, type: 'error' };
  }
};

const getCsvlodSchema = (type: string) => {
  switch (type) {
    case 'principles':
      return principlesSchema;
    case 'policies':
      return policiesSchema;
    case 'guidelines':
      return guidelinesSchema;
    default:
      return {};
  }
};

const getCsvlodModelMessages = (
  type: string,
  props: ModelMessagesProps,
): ChatCompletionMessageParam[] => {
  switch (type) {
    case 'principles':
      return getCsvlodConsiderationsPrinciplesModel(props);
    case 'policies':
      return getCsvlodConsiderationsPoliciesModel(props);
    /*     case 'guidelines':
      return getCsvlodStandardsGuidelinesModelMessages(props); */
    default:
      return [];
  }
};

export { generateGoalsModel, generateBlueprintsModel, generateCsvlodModel };
