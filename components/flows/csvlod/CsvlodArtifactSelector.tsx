import { ArtifactSelectorWithSections } from '@/types/types';
import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { Handshake, ListChecks, Siren } from 'lucide-react';

interface CsvlodArtifactSelectorProps {
  items: ArtifactSelectorWithSections[];
}

export default function CsvlodArtifactSelector({
  items,
}: CsvlodArtifactSelectorProps) {
  const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0';

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Seleccionar artefacto</Button>
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
