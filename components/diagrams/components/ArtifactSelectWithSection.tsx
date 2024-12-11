'use client';

import { ArtifactSelectorWithSection } from '@/types';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';

interface ArtifactSelectorProps {
  items: ArtifactSelectorWithSection[];
  onArtifactSelect: (item: string) => void;
}

export default function ArtifactSelectWithSection({
  items,
  onArtifactSelect,
}: ArtifactSelectorProps) {
  const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0';

  const handleItemSelect = (item: string) => {
    onArtifactSelect(item);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded">Seleccionar artefacto</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Menu de artefactos" variant="faded">
        {items.map((section) => (
          <DropdownSection
            showDivider
            key={section.section}
            title={section.section}
          >
            {section.items.map((item) => (
              <DropdownItem
                key={item.type}
                description={item.description}
                startContent={
                  item.icon ? <item.icon className={iconClasses} /> : null
                }
                onClick={() => handleItemSelect(item.type)}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
