'use client';

import Icon from '@/components/shared/Icon';
import { ArtifactSelectItem, ArtifactSelectorWithSection } from '@/types';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { useEffect, useState } from 'react';

interface ArtifactSelectorProps {
  defaultItem?: string;
  items: ArtifactSelectorWithSection[];
  onArtifactSelect: (item: string) => void;
}

export default function ArtifactSelectWithSection({
  items,
  onArtifactSelect,
  defaultItem,
}: ArtifactSelectorProps) {
  const [selectedItem, setSelectedItem] = useState<ArtifactSelectItem | null>(
    null,
  );

  const handleItemSelect = (item: string) => {
    onArtifactSelect(item);
    items.map((section) => {
      section.items.map((i) => {
        if (i.type === item) {
          setSelectedItem(i);
        }
      });
    });
  };

  useEffect(() => {
    if (defaultItem) {
      items.map((section) => {
        section.items.map((item) => {
          if (item.type === defaultItem) {
            setSelectedItem(item);
          }
        });
      });
    }
  }, []);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ghost">{`${selectedItem?.label || 'Seleccionar artefacto '}`}</Button>
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
                  item.icon ? (
                    <Icon name={item.icon as keyof typeof dynamicIconImports} />
                  ) : null
                }
                onPress={() => handleItemSelect(item.type)}
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
