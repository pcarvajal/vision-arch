'use client';

import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import { ArtifactSelectorWithSection, CustomNodeData } from '@/types';
import React from 'react';
import { Artifact } from '../../../types/types';
import ArtifactSelectWithSection from './ArtifactSelectWithSection';
import { SelectNodes } from './SelectNodes';

interface ArtifactToolbarProps {
  saveArtifactModal?: boolean;
  selectNodeItems: CustomNodeData[];
  artifactSelectWithSectionItems: ArtifactSelectorWithSection[];
  className?: string;
}

export const ArtifactToolbar = ({
  saveArtifactModal,
  selectNodeItems,
  artifactSelectWithSectionItems,
  className,
}: ArtifactToolbarProps) => {
  const handleArtifactSelect = (artifact: Artifact) => {
    console.log(artifact);
  };

  return (
    <div className="flex flex-row space-x-4">
      <div>
        {artifactSelectWithSectionItems.length > 0 && (
          <ArtifactSelectWithSection
            items={artifactSelectWithSectionItems}
            onArtifactSelect={() => handleArtifactSelect}
          />
        )}
      </div>
      <div className="flex flex-col space-x-4">
        {selectNodeItems.length > 0 && <SelectNodes nodes={selectNodeItems} />}
        {saveArtifactModal && <SaveArtifactModal />}
      </div>
    </div>
  );
};
