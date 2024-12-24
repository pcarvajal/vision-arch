import { ArtifacTypeEnum } from '@/config/enum';
import { IModelMessagesParams } from '@/types/forms';
import { ChatCompletionMessageParam } from 'openai/resources';
import { TArtifactType } from '..';
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

const getSchemaHelper = (type: TArtifactType) => {
  switch (type) {
    case ArtifacTypeEnum.principles:
      return principlesSchema;
    case ArtifacTypeEnum.policies:
      return policiesSchema;
    case ArtifacTypeEnum.guidelines:
      return guidelinesSchema;
    case ArtifacTypeEnum.goals:
      return goalsSchema;
    case ArtifacTypeEnum.blueprints:
      return blueprintsSchema;
    default:
      return {};
  }
};

const getMessagesHelper = (
  type: TArtifactType,
  params: IModelMessagesParams,
): ChatCompletionMessageParam[] => {
  switch (type) {
    case ArtifacTypeEnum.principles:
      return getCsvlodConsiderationsPrinciplesModel(params);
    case ArtifacTypeEnum.policies:
      return getCsvlodConsiderationsPoliciesModel(params);
    case ArtifacTypeEnum.guidelines:
      return getCsvlodStandardsGuidelinesModelMessages(params);
    case ArtifacTypeEnum.goals:
      return getGoalsMessages(params);
    case ArtifacTypeEnum.blueprints:
      return getBlueprintsModelMessages(params);
    default:
      return [];
  }
};

export { getSchemaHelper, getMessagesHelper };
