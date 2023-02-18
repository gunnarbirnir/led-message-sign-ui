import React, { FC, useCallback } from "react";
import styled from "styled-components";

import { useAppContext, useFocusSignTextArea } from "../hooks";
import { TextArea, HueSlider, Slider, Button } from "./elements";
import CopyLinkButton from "./CopyLinkButton";

const MenuForm: FC = () => {
  const {
    menuOpen,
    signText,
    colorHue,
    animationSpeed,
    signHeight,
    resetSignConfig,
    setSignText,
    setColorHue,
    setAnimationSpeed,
    setSignHeight,
  } = useAppContext();
  const textAreaRef = useFocusSignTextArea(menuOpen);

  const handleReset = useCallback(() => {
    resetSignConfig();
    if (textAreaRef?.current) {
      textAreaRef.current.focus();
    }
  }, [resetSignConfig, textAreaRef]);

  return (
    <StyledMenuForm className="d-f fd-r">
      <FormMain>
        <div>
          <TextArea
            ref={textAreaRef}
            value={signText}
            height={100}
            maxLength={100}
            placeholder="Sign Text"
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
      <FormOther>
        <FormButtons className="d-f fd-r">
          <CopyLinkButton />
          <Button onClick={handleReset}>Reset</Button>
        </FormButtons>
      </FormOther>
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
`;

const FormButtons = styled.div`
  gap: var(--padding-3);
  > * {
    flex: 1;
  }
`;

export default MenuForm;
