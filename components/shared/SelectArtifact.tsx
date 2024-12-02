'use client';

import { Select, SelectItem } from '@nextui-org/react';

interface SelectItem {
  key: string;
  label: string;
}

interface SelectArtifactProps {
  label: string;
  placeholder?: string;
  disabledKeys?: string[];
  items: SelectItem[];
  onValueChange: (value: string) => void;
  value: string;
}

export const SelectArtifact = ({
  items,
  disabledKeys,
  placeholder,
  label,
  onValueChange,
  value,
}: SelectArtifactProps) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(e.target.value);
  };
  return (
    <Select
      label={label}
      placeholder={placeholder}
      disabledKeys={disabledKeys}
      className="w-full"
      onChange={handleChangeValue}
      value={value}
    >
      {items.map((item) => (
        <SelectItem key={item.key}>{item.label}</SelectItem>
      ))}
    </Select>
  );
};
