import React, { FC } from "react";
import styled from "styled-components";

import { HUE_DEGREES } from "../constants";
import Slider, {
  SliderTrack,
  SliderRange,
  IProps as ISliderProps,
} from "./Slider";

type IProps = Omit<ISliderProps, "min" | "max">;

// TODO: Move to utils?
const generateHueGradient = () => {
  let gradientColors = "";
  for (let d = 0; d <= HUE_DEGREES; d++) {
    gradientColors += `, hsl(${d}deg 100% 60%)`;
  }
  return `linear-gradient(to right${gradientColors})`;
};

const HueSlider: FC<IProps> = (props) => {
  return (
    <StyledHueSlider>
      <Slider {...props} min={0} max={HUE_DEGREES} />
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
