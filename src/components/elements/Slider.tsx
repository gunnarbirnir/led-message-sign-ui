import React, { FC, useMemo, CSSProperties } from "react";
import styled from "styled-components";
import * as Slider from "@radix-ui/react-slider";

interface SliderProps {
  value: number;
  label?: string;
  displayValue?: boolean;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const SliderComp: FC<SliderProps> = ({
  value,
  label,
  displayValue = true,
  min,
  max,
  onChange,
}) => {
  const cssVariables = useMemo(
    () =>
      ({
        "--slider-height": "20px",
        "--slider-track-height": "6px",
        "--slider-thumb-shadow-color": "hsl(0deg 0% 0% / 0.8)",
        "--slider-thumb-active-shadow-color": "hsl(0deg 0% 0% / 0.5)",
      } as CSSProperties),
    []
  );

  return (
    <div className="d-f fd-c w-100">
      {label && (
        <SliderLabel>
          {label}
          {displayValue ? `: ${value}` : ""}
        </SliderLabel>
      )}
      <StyledSlider
        value={[value]}
        min={min}
        max={max}
        className="pos-r d-f ai-c"
        style={cssVariables}
        onValueChange={(values) => onChange(values[0])}
      >
        <SliderTrack className="pos-r f-1">
          <SliderRange className="pos-a h-100" />
        </SliderTrack>
        <SliderThumb />
      </StyledSlider>
    </div>
  );
};

const StyledSlider = styled(Slider.Root)`
  height: var(--slider-height);
  user-select: none;
  touch-action: none;
`;

const SliderLabel = styled.p`
  text-transform: uppercase;
  color: var(--white);
  font-size: 12px;
  font-weight: 600;
  padding-bottom: var(--padding-2);
`;

export const SliderTrack = styled(Slider.Track)`
  background-color: var(--border-color);
  height: var(--slider-track-height);
  border-radius: calc(var(--slider-track-height) / 2);
  cursor: pointer;
`;

export const SliderRange = styled(Slider.Range)`
  background-color: hsl(var(--color-hue) 70% 70%);
  border-radius: calc(var(--slider-track-height) / 2);
`;

export const SliderThumb = styled(Slider.Thumb)`
  display: block;
  cursor: grab;
  width: var(--slider-height);
  height: var(--slider-height);
  border-radius: calc(var(--slider-height) / 2);
  background-color: var(--white);
  box-shadow: 0 2px 10px 2px var(--slider-thumb-shadow-color);

  &:active {
    cursor: grabbing;
    box-shadow: 0 0 0 5px var(--slider-thumb-active-shadow-color);
  }
  &:focus {
    outline: none;
  }
`;

export default SliderComp;
