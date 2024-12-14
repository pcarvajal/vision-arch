'use client';

import { Select, SelectItem } from '@nextui-org/react';

interface SelectItem {
  key: string;
  label: string;
}

interface SelectArtifactProps {
  items: SelectItem[];
  onValueChange: (value: string) => void;
  className?: string;
}

export const SelectArtifact = ({
  items,
  onValueChange,
  className,
}: SelectArtifactProps) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <div className={className}>
      <Select
        className=""
        onChange={handleChangeValue}
        label="Selecciona un artefacto"
      >
        {items.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};
