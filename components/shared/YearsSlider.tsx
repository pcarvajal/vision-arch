import { UIColors } from '@/types';
import { Slider } from '@nextui-org/react';

interface YearsSliderProps {
  className?: string;
  color?: UIColors;
  step: number;
  label: string;
  showSteps?: boolean;
  maxValue: number;
  minValue: number;
  defaultValue: number;
  onChangeEnd: (value: number) => void;
}

const YearsSlider = ({
  className,
  color,
  defaultValue,
  label,
  maxValue,
  minValue,
  step,
  showSteps,
  onChangeEnd,
}: YearsSliderProps) => {
  const handleOnChangeEnd = (value: number | number[]) => {
    if (typeof value === 'number') onChangeEnd(value);
  };

  return (
    <div className={className}>
      <Slider
        size="sm"
        step={step}
        color={color || 'foreground'}
        label={label}
        showSteps={showSteps || false}
        maxValue={maxValue}
        minValue={minValue}
        defaultValue={defaultValue}
        className="max-w-md"
        formatOptions={{ style: 'decimal' }}
        onChangeEnd={(value) => handleOnChangeEnd(value)}
      />
    </div>
  );
};

export default YearsSlider;
