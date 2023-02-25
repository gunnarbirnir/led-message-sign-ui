import React, { FC, useCallback } from "react";
import styled from "styled-components";

import { useAppContext, useFocusSignTextArea } from "../hooks";
import { MEDIA_QUERY } from "../constants";
import { TextArea, HueSlider, Slider, Button, Switch } from "./elements";
import CopyLinkButton from "./CopyLinkButton";

const MenuForm: FC = () => {
  const {
    menuOpen,
    signText,
    colorHue,
    animationSpeed,
    signHeight,
    fullWidth,
    hideFrame,
    coloredOffLights,
    resetSignConfig,
    setSignText,
    setColorHue,
    setAnimationSpeed,
    setSignHeight,
    setFullWidth,
    setHideFrame,
    setColoredOffLights,
  } = useAppContext();
  const textAreaRef = useFocusSignTextArea(menuOpen);

  const handleReset = useCallback(() => {
    resetSignConfig();
    if (textAreaRef?.current) {
      textAreaRef.current.focus();
    }
  }, [resetSignConfig, textAreaRef]);

  return (
    <StyledMenuForm>
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
        <Switch
          label="Full Width"
          checked={fullWidth}
          onCheckedChange={setFullWidth}
        />
        <Switch
          label="Hide Frame"
          checked={hideFrame}
          onCheckedChange={setHideFrame}
        />
        <Switch
          label="Colored Off Lights"
          checked={coloredOffLights}
          onCheckedChange={setColoredOffLights}
        />
        <FormButtons className="d-f fd-r">
          <CopyLinkButton />
          <Button onClick={handleReset}>Reset</Button>
        </FormButtons>
      </FormOther>
    </StyledMenuForm>
  );
};

const StyledMenuForm = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--padding-4);

  @media (max-width: ${MEDIA_QUERY.SIGN_WIDTH}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    grid-template-columns: 1fr;
    gap: var(--padding-3);
  }
`;

const FormMain = styled.div`
  > * {
    padding-bottom: var(--padding-3);
  }
`;

const FormOther = styled.div`
  > * {
    padding-bottom: var(--padding-3);
  }
`;

const FormButtons = styled.div`
  padding-top: var(--padding-3);
  gap: var(--padding-3);

  button {
    flex: 1;
  }
`;

export default MenuForm;
