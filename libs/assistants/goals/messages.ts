import { context } from '@/libs/assistants/context';
import { task } from '@/libs/assistants/goals/prompt';
import { IModelMessagesParams } from '@/types/forms';
import { ChatCompletionMessageParam } from 'openai/resources';

export const getGoalsMessages = (
  props: IModelMessagesParams,
): ChatCompletionMessageParam[] => {
  return [
    {
      role: 'system',
      content: context,
    },
    {
      role: 'user',
      content: `${task.replace(/{{(.*?)}}/g, (_: any, key: string) => props[key.trim() as keyof IModelMessagesParams] || '')}`,
    },
  ];
};
