import { task } from '@/libs/assistants/blueprints/prompt';
import { context } from '@/libs/assistants/context';
import { ChatCompletionMessageParam } from 'openai/resources';

interface BlueprintModelMessagesProps {
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
  year: string;
}

export const getBlueprintsModelMessages = (
  props: BlueprintModelMessagesProps,
): ChatCompletionMessageParam[] => {
  return [
    {
      role: 'system',
      content: context,
    },
    {
      role: 'user',
      content: `${task.replace(/{{(.*?)}}/g, (_: any, key: string) => props[key.trim() as keyof BlueprintModelMessagesProps] || '')}. All texts of the edges and nodes must be in Spanish`,
    },
  ];
};
