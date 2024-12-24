'use server';

import { databases } from '@/libs/backend/databases';
import { getMessagesHelper, getSchemaHelper } from '@/libs/helpers';
import openai from '@/libs/openAI';
import { parseStringify } from '@/libs/utils';
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
}: IGenerateArtifactParams) => {
  console.log('target', { companyId, year, type });
  try {
    const company = await databases.getDocument<ICompanyModel>(
      databaseId!,
      companiesId!,
      companyId,
    );

    if (!company) {
      return { message: 'Compañia no encontrada', type: 'error' };
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
    return parseStringify(response.choices[0].message.content);
  } catch (error: any) {
    console.error('Error generando el modelo:', error);
    return { message: error?.message, type: 'error' };
  }
};

export { generateModel };
