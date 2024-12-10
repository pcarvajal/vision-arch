import { ArtifactEnum } from '@/config/enum';
import { ArtifactType, ModelMessagesParams } from '@/types';
import { ChatCompletionMessageParam } from 'openai/resources';
import { schema as blueprintsSchema } from '../libs/assistants/blueprints/schema';
import { schema as policiesSchema } from '../libs/assistants/csvlod/considerations/policies/schema';
import { schema as principlesSchema } from '../libs/assistants/csvlod/considerations/principles/schema';
import { schema as guidelinesSchema } from '../libs/assistants/csvlod/standards/guidelines/schema';
import { schema as goalsSchema } from '../libs/assistants/goals/schema';
import { getBlueprintsModelMessages } from './assistants/blueprints/messages';
import { getCsvlodConsiderationsPoliciesModel } from './assistants/csvlod/considerations/policies/messages';
import { getCsvlodConsiderationsPrinciplesModel } from './assistants/csvlod/considerations/principles/messages';
import { getCsvlodStandardsGuidelinesModelMessages } from './assistants/csvlod/standards/guidelines/messages';
import { getGoalsMessages } from './assistants/goals/messages';

const getSchemaHelper = (type: ArtifactType) => {
  switch (type) {
    case ArtifactEnum.PRINCIPLES:
      return principlesSchema;
    case ArtifactEnum.POLICIES:
      return policiesSchema;
    case ArtifactEnum.GUIDELINES:
      return guidelinesSchema;
    case ArtifactEnum.GOALS:
      return goalsSchema;
    case ArtifactEnum.BLUEPRINTS:
      return blueprintsSchema;
    default:
      return {};
  }
};

const getMessagesHelper = (
  type: ArtifactType,
  params: ModelMessagesParams,
): ChatCompletionMessageParam[] => {
  switch (type) {
    case ArtifactEnum.PRINCIPLES:
      return getCsvlodConsiderationsPrinciplesModel(params);
    case ArtifactEnum.POLICIES:
      return getCsvlodConsiderationsPoliciesModel(params);
    case ArtifactEnum.GUIDELINES:
      return getCsvlodStandardsGuidelinesModelMessages(params);
    case ArtifactEnum.GOALS:
      return getGoalsMessages(params);
    case ArtifactEnum.BLUEPRINTS:
      return getBlueprintsModelMessages(params);
    default:
      return [];
  }
};

export { getSchemaHelper, getMessagesHelper };
