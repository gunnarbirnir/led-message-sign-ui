import React, { FC } from "react";
import styled from "styled-components";

import { useAppContext, useFocusSignTextArea } from "../hooks";
import { TextArea, HueSlider, Slider } from "./elements";

const MenuForm: FC = () => {
  const {
    menuOpen,
    signText,
    colorHue,
    animationSpeed,
    signHeight,
    setSignText,
    setColorHue,
    setAnimationSpeed,
    setSignHeight,
  } = useAppContext();
  const textAreaRef = useFocusSignTextArea(menuOpen);

  return (
    <StyledMenuForm className="d-f fd-r">
      <FormMain>
        <div>
          <TextArea
            ref={textAreaRef}
            value={signText}
            height={100}
            maxLength={100}
            onChange={setSignText}
          />
        </div>
        <HueSlider value={colorHue} onChange={setColorHue} />
        <Slider
          value={animationSpeed}
          label="Speed"
          min={1}
          max={10}
          onChange={setAnimationSpeed}
        />
        <Slider
          value={signHeight}
          label="Height"
          min={50}
          max={250}
          onChange={setSignHeight}
        />
      </FormMain>
      <FormOther />
    </StyledMenuForm>
  );
};

const StyledMenuForm = styled.div`
  gap: var(--padding-4);
`;

const FormMain = styled.div`
  flex: 2;

  > * {
    padding-bottom: var(--padding-3);
  }
`;

const FormOther = styled.div`
  flex: 1;
  background-color: pink;
  height: 100%;
  width: 100%;
`;

export default MenuForm;
