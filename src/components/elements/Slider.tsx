import React, { FC, useMemo, CSSProperties, useCallback } from "react";
import styled from "styled-components";
import * as Slider from "@radix-ui/react-slider";

interface SliderProps {
  value: number;
  label?: string;
  displayValue?: boolean;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

const SliderComp: FC<SliderProps> = ({
  value,
  label,
  displayValue = true,
  min,
  max,
  disabled = false,
  onChange,
}) => {
  const sliderValue = useMemo(() => {
    let sanitizedValue = value;

    if (min) {
      sanitizedValue = Math.max(min, sanitizedValue);
    }
    if (max) {
      sanitizedValue = Math.min(max, sanitizedValue);
    }
    return sanitizedValue;
  }, [max, min, value]);

  const cssVariables = useMemo(
    () =>
      ({
        "--slider-height": "20px",
        "--slider-track-height": "6px",
      } as CSSProperties),
    []
  );

  const handleValueChange = useCallback(
    (values: number[]) => {
      onChange(values[0]);
    },
    [onChange]
  );

  return (
    <div className="d-f fd-c">
      {label && (
        <SliderLabel disabled={disabled}>
          {label}
          {displayValue ? `: ${sliderValue}` : ""}
        </SliderLabel>
      )}
      <StyledSlider
        value={[sliderValue]}
        min={min}
        max={max}
        disabled={disabled}
        className="pos-r d-f ai-c"
        style={cssVariables}
        onValueChange={handleValueChange}
      >
        <SliderTrack className="pos-r f-1">
          <SliderRange className="pos-a h-100" />
        </SliderTrack>
        <SliderThumb />
      </StyledSlider>
    </div>
  );
};

export const SliderRange = styled(Slider.Range)`
  border-radius: var(--border-radius-round);
`;

export const SliderThumb = styled(Slider.Thumb)`
  display: block;
  cursor: grab;
  width: var(--slider-height);
  height: var(--slider-height);
  border-radius: var(--border-radius-round);
  box-shadow: var(--box-shadow-normal);

  :active {
    cursor: grabbing;
    box-shadow: var(--box-shadow-solid);
  }
  :focus {
    outline: none;
  }
`;

const StyledSlider = styled(Slider.Root)`
  height: var(--slider-height);
  user-select: none;
  touch-action: none;

  ${SliderRange} {
    background-color: ${({ disabled }) =>
      disabled ? "var(--medium-gray)" : "var(--primary-color-faded)"};
  }
  ${SliderThumb} {
    background-color: ${({ disabled }) =>
      disabled ? "var(--light-gray)" : "var(--white)"};
  }
`;

const SliderLabel = styled.p<{ disabled: boolean }>`
  text-transform: uppercase;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding-bottom: var(--padding-2);
  -webkit-text-size-adjust: 100%;
  color: ${({ disabled }) => (disabled ? "var(--light-gray)" : "var(--white)")};
`;

export const SliderTrack = styled(Slider.Track)`
  background-color: var(--dark-gray);
  height: var(--slider-track-height);
  border-radius: var(--border-radius-round);
  cursor: pointer;
`;

export default SliderComp;
