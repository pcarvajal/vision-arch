import { task } from '@/libs/assistants/blueprints/prompt';
import { context } from '@/libs/assistants/context';
import { IModelMessagesParams } from '@/types/forms';
import { ChatCompletionMessageParam } from 'openai/resources';

export const getBlueprintsModelMessages = (
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
