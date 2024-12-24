'use client';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SelectItem,
  Select as SelectParent,
} from '@nextui-org/react';

interface IItem {
  key: string;
  label: string;
}

interface ISelectArtifactProps {
  label: string;
  items: IItem[];
  onValueChange: (value: string) => void;
  className?: string;
}

export const Select = ({
  label,
  items,
  onValueChange,
  className,
}: ISelectArtifactProps) => {
  const handleChangeValue = (value: string) => {
    onValueChange(value);
  };

  return (
    <div className={className}>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">{label}</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {items.map((item: IItem) => (
            <DropdownItem
              key={item.key}
              onPress={() => handleChangeValue(item.key)}
              textValue={item.label}
            >
              <span>{item.label}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
