import { context } from '@/libs/assistants/context';
import { task } from '@/libs/assistants/goals/prompt';
import { ChatCompletionMessageParam } from 'openai/resources';

export const getBusinessObjetiveModelMessages = (
  companyName: string,
  companyMission: string,
  companyVision: string,
  companyObjetives: string,
  projectionYear: string,
): ChatCompletionMessageParam[] => {
  return [
    {
      role: 'system',
      content: context,
    },
    {
      role: 'user',
      content: `The company ${companyName} has the following mission: ${companyMission}. The vision is ${companyVision}. The strategic objectives are: ${companyObjetives}.`,
    },
    {
      role: 'system',
      content: `${task.replace('{year}', projectionYear)} title and description for node in spanish.`,
    },
  ];
};
