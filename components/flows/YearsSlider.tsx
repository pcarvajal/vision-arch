import { Slider } from '@nextui-org/react';

const YearsSlider = () => {
  return (
    <div className="flex w-full">
      <Slider
        size="sm"
        step={1}
        color="foreground"
        label="Proyección"
        showSteps={true}
        maxValue={2027}
        minValue={2024}
        defaultValue={2024}
        className="max-w-md"
      />
    </div>
  );
};

export default YearsSlider;
