'use client';

import { yearRange } from '@/config/constants';
import { Slider } from '@nextui-org/react';

interface YearsSliderProps {
  step: number;
  label: string;
  isDisabled?: boolean;
  className?: string;
  onChangeEnd: (value: number) => void;
}

const YearsSlider = ({
  className,
  label,
  isDisabled = false,
  onChangeEnd,
}: YearsSliderProps) => {
  const handleOnChangeEnd = (value: number | number[]) => {
    if (typeof value === 'number') onChangeEnd(value);
  };

  return (
    <div className={className}>
      <Slider
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

export default YearsSlider;
