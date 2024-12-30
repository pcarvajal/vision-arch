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
import { useMemo, useState } from 'react';

interface IItem {
  key: string;
  label: string;
}

interface ISelectArtifactProps {
  label: string;
  items: IItem[];
  selectedKey?: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export const Select = ({
  label,
  items,
  onValueChange,
  className,
  selectedKey,
}: ISelectArtifactProps) => {
  const getValueByKey = (key: string) => {
    const item = items.find((item) => item.key === key);
    return item ? item.label : items[0].label;
  };

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(selectedKey ? [getValueByKey(selectedKey)] : []),
  );
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replace(/_/g, ''),
    [selectedKeys],
  );
  const handleChangeValue = (value: string) => {
    setSelectedKeys(new Set([getValueByKey(value)]));
    onValueChange(value);
  };

  return (
    <div className={className}>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            {selectedValue ? selectedValue : label}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          selectedKeys={selectedKeys}
          selectionMode="single"
          onSelectionChange={(keys) =>
            setSelectedKeys(new Set(Array.from(keys as Set<string>)))
          }
        >
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
