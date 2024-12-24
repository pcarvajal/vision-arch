'use server';

import {
  CREATE_AI_MODEL_ERROR,
  RESOURCE_NOT_FOUND_ERROR,
  UNHANDLED_ERROR,
} from '@/config/errors';
import { databases } from '@/libs/backend/databases';
import { getMessagesHelper, getSchemaHelper } from '@/libs/helpers';
import openai from '@/libs/openAI';
import { IActionResponse, IGenerateModelResponse } from '@/types/actions';
import { ICompanyModel } from '@/types/appwrite';
import { IGenerateArtifactParams } from '@/types/forms';

const {
  APPWRITE_DATABASE_ID: databaseId,
  APPWRITE_COMPANIES_ID: companiesId,
  OPENAI_MODEL: modelAi,
} = process.env;

const generateModel = async ({
  companyId,
  year,
  type,
}: IGenerateArtifactParams): Promise<
  IActionResponse<IGenerateModelResponse>
> => {
  try {
    const company = await databases.getDocument<ICompanyModel>(
      databaseId!,
      companiesId!,
      companyId,
    );

    if (!company) {
      return {
        data: null,
        response: {
          ...RESOURCE_NOT_FOUND_ERROR,
          message: 'Compañia no encontrada',
        },
      };
    }

    const { name, mission, vision, description, objetives } = company;

    const response = await openai.chat.completions.create({
      model: modelAi as string,
      messages: getMessagesHelper(type, {
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
          schema: getSchemaHelper(type),
          strict: true,
        },
      },
    });

    if (!response.choices[0].message.content) {
      return {
        data: null,
        response: {
          ...CREATE_AI_MODEL_ERROR,
          message: 'No se pudo crear el modelo',
        },
      };
    }

    return { data: { model: response.choices[0].message.content } };
  } catch (error: any) {
    console.error({ ...UNHANDLED_ERROR, error });
    return {
      data: null,
      response: {
        ...UNHANDLED_ERROR,
        message: 'No se pudo crear el modelo',
      },
    };
  }
};

export { generateModel };
