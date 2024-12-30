'use client';

import { yearRange } from '@/config/constants';
import { Slider as SliderUI } from '@nextui-org/react';

interface YearsProps {
  step: number;
  label: string;
  isDisabled?: boolean;
  className?: string;
  onChangeEnd: (value: number) => void;
}

const Slider = ({
  className,
  label,
  isDisabled = false,
  onChangeEnd,
}: YearsProps) => {
  const handleOnChangeEnd = (value: number | number[]) => {
    if (typeof value === 'number') onChangeEnd(value);
  };

  return (
    <div className={className}>
      <SliderUI
        size="sm"
        step={1}
        color={'primary'}
        label={label}
        showSteps={true}
        maxValue={yearRange.max}
        minValue={yearRange.min}
        defaultValue={yearRange.default}
        className="max-w-md rounded-lg bg-black bg-opacity-45 p-4 text-white dark:bg-white dark:text-black"
        formatOptions={{ style: 'decimal' }}
        onChangeEnd={(value) => handleOnChangeEnd(value)}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default Slider;
