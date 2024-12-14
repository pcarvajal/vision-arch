import { task } from '@/libs/assistants/blueprints/prompt';
import { context } from '@/libs/assistants/context';
import { ModelMessagesParams } from '@/types';
import { ChatCompletionMessageParam } from 'openai/resources';

export const getBlueprintsModelMessages = (
  props: ModelMessagesParams,
): ChatCompletionMessageParam[] => {
  return [
    {
      role: 'system',
      content: context,
    },
    {
      role: 'user',
      content: `${task.replace(/{{(.*?)}}/g, (_: any, key: string) => props[key.trim() as keyof ModelMessagesParams] || '')}. All texts of the edges and nodes must be in Spanish`,
    },
  ];
};
