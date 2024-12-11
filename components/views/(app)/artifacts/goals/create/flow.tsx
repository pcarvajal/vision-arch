'use client';

import ArtifactFlow from '@/components/diagrams/ArtifactFlow';
import { goalsFlowTypes } from '@/components/diagrams/NodeFlowsTypes';
import { goalsNodes } from '@/config/constants';
import { ArtifactCategoryEnum, ArtifactEnum } from '@/config/enum';
import React from 'react';

export const GoalsFlow = () => {
  return (
    <ArtifactFlow
      types={[ArtifactEnum.GOALS]}
      category={ArtifactCategoryEnum.OBJETIVES}
      edgeTypes={goalsFlowTypes.edgeTypes}
      nodeTypes={goalsFlowTypes.nodeTypes}
      customNodes={goalsNodes}
    />
  );
};
