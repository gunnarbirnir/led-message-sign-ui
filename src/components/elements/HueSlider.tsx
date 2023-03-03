import React, { FC } from "react";
import styled from "styled-components";

import { MIN_COLOR_HUE, MAX_COLOR_HUE } from "../../constants";
import { generateHueGradient } from "../../utils";
import Slider, { SliderTrack, SliderRange } from "./Slider";

interface HueSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const HueSlider: FC<HueSliderProps> = (props) => {
  return (
    <StyledHueSlider>
      <Slider
        {...props}
        label="Color"
        displayValue={false}
        min={MIN_COLOR_HUE}
        max={MAX_COLOR_HUE}
      />
    </StyledHueSlider>
  );
};

const StyledHueSlider = styled.div`
  && {
    ${SliderTrack} {
      background-color: transparent;
      background-image: ${generateHueGradient()};
    }
    ${SliderRange} {
      background-color: transparent;
    }
  }
`;

export default HueSlider;
