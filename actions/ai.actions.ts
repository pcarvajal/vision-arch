'use server';

import { getBusinessObjetiveModelMessages } from '@/libs/assistants/GoalsAssistant/messages';
import { dbConnect } from '@/libs/mongodb';
import openai from '@/libs/openAI';
import { parseStringify } from '@/libs/utils';
import Company from '@/schemas/CompanySchema';
import { schema } from '../libs/assistants/GoalsAssistant/schema';

const { OPENAI_MODEL: modelAi } = process.env;

const generateObjetivesModel = async ({
  companyId,
  year,
}: GenerateCompanyObjetivesParams) => {
  try {
    await dbConnect();
    const company = await Company.findById(companyId);
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
          schema,
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

export { generateObjetivesModel };
