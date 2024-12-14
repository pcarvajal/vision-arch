'use client';

import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import {
  ArtifactSelectorWithSection,
  CustomNodeData,
  GenericNodeProps,
} from '@/types';
import React from 'react';
import ArtifactSelectWithSection from './ArtifactSelectWithSection';
import { SelectArtifact } from './SelectArtifact';
import { SelectNodes } from './SelectNodes';

interface ArtifactToolbarProps {
  selectNodeItems?: GenericNodeProps[];
  saveArtifactModal?: boolean;
  companyArtifacts?: {
    items: { key: string; label: string }[];
    onValueChange: (value: string) => void;
  };
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
  companyArtifacts,
  className,
}: ArtifactToolbarProps) => {
  const handleArtifactSelect = (artifact: string) => {
    artifactSelect?.onArtifactSelect(artifact);
  };

  return (
    <div className={className}>
      <div className="flex flex-row items-center space-x-4">
        {companyArtifacts && (
          <div className="flex w-[300px] flex-row justify-between space-x-4">
            <SelectArtifact
              items={companyArtifacts.items}
              onValueChange={companyArtifacts.onValueChange}
              className="flex-grow"
            />
          </div>
        )}
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
