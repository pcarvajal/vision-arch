import { context } from '@/libs/assistants/context';
import { categoryContext } from '@/libs/assistants/csvlod/considerations/categoryContext';
import { task } from '@/libs/assistants/csvlod/considerations/principles/prompt';
import { typeContext } from '@/libs/assistants/csvlod/typeContext';
import { ModelMessagesParams } from '@/types';
import { ChatCompletionMessageParam } from 'openai/resources';

export const getCsvlodConsiderationsPrinciplesModel = (
  props: ModelMessagesParams,
): ChatCompletionMessageParam[] => {
  return [
    {
      role: 'system',
      content: `${context}. ${typeContext}. ${categoryContext}`,
    },
    {
      role: 'user',
      content: `${task.replace(/{{(.*?)}}/g, (_: any, key: string) => props[key.trim() as keyof ModelMessagesParams] || '')}. All texts of the edges and nodes must be in Spanish`,
    },
  ];
};
