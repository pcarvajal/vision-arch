import { context } from '@/libs/assistants/context';
import { categoryContext } from '@/libs/assistants/csvlod/considerations/categoryContext';
import { task } from '@/libs/assistants/csvlod/considerations/principles/prompt';
import { typeContext } from '@/libs/assistants/csvlod/typeContext';
import { ChatCompletionMessageParam } from 'openai/resources';

interface ModelMessagesProps {
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
  year: string;
}

export const getCsvlodConsiderationsPrinciplesModel = (
  props: ModelMessagesProps,
): ChatCompletionMessageParam[] => {
  return [
    {
      role: 'system',
      content: `${context}. ${typeContext}. ${categoryContext}`,
    },
    {
      role: 'user',
      content: `${task.replace(/{{(.*?)}}/g, (_: any, key: string) => props[key.trim() as keyof ModelMessagesProps] || '')}. All texts of the edges and nodes must be in Spanish`,
    },
  ];
};
