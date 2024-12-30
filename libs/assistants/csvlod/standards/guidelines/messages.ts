import { context } from '@/libs/assistants/context';
import { categoryContext } from '@/libs/assistants/csvlod/standards/categoryContext';
import { task } from '@/libs/assistants/csvlod/standards/guidelines/prompt';
import { typeContext } from '@/libs/assistants/csvlod/typeContext';
import { IModelMessagesParams } from '@/types/forms';
import { ChatCompletionMessageParam } from 'openai/resources';

export const getCsvlodStandardsGuidelinesModelMessages = (
  props: IModelMessagesParams,
): ChatCompletionMessageParam[] => {
  return [
    {
      role: 'system',
      content: `${context}. ${typeContext}. ${categoryContext}`,
    },
    {
      role: 'user',
      content: `${task.replace(/{{(.*?)}}/g, (_: any, key: string) => props[key.trim() as keyof IModelMessagesParams] || '')}.`,
    },
  ];
};
