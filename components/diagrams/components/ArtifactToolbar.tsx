'use client';

import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import {
  ArtifactSelectorWithSection,
  CustomNodeData,
  GenericNodeProps,
} from '@/types';
import React from 'react';
import { Artifact } from '../../../types/types';
import ArtifactSelectWithSection from './ArtifactSelectWithSection';
import { SelectNodes } from './SelectNodes';

interface ArtifactToolbarProps {
  selectNodeItems?: GenericNodeProps[];
  saveArtifactModal?: boolean;
  artifactSelect?: {
    items: ArtifactSelectorWithSection[];
    defaultItem?: string;
    onArtifactSelect: (item: string) => void;
  };
  className?: string;
}

export const ArtifactToolbar = <T extends CustomNodeData>({
  saveArtifactModal,
  selectNodeItems,
  artifactSelect,
  className,
}: ArtifactToolbarProps) => {
  const handleArtifactSelect = (artifact: string) => {
    artifactSelect?.onArtifactSelect(artifact);
  };

  return (
    <div className="flex flex-row space-x-4">
      <div>
        {artifactSelect && (
          <ArtifactSelectWithSection
            defaultItem={artifactSelect.defaultItem}
            items={artifactSelect.items}
            onArtifactSelect={handleArtifactSelect}
          />
        )}
      </div>
      <div className="flex flex-row space-x-4">
        {selectNodeItems && <SelectNodes nodes={selectNodeItems} />}
        {saveArtifactModal && <SaveArtifactModal />}
      </div>
    </div>
  );
};
