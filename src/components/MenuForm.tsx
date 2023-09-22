import React, { FC, useCallback } from "react";
import styled from "styled-components";

import { useAppContext, useFocusSignTextArea } from "../hooks";
import {
  MEDIA_QUERY,
  MIN_SPEED,
  MAX_SPEED,
  MIN_HEIGHT,
  MAX_HEIGHT,
} from "../constants";
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
    setMenuOpen,
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

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  return (
    <StyledMenuForm>
      <FormMain>
        <div>
          <TextArea
            ref={textAreaRef}
            value={signText}
            height={100}
            maxLength={1000}
            placeholder="Sign Text"
            onChange={setSignText}
          />
        </div>
        <HueSlider value={colorHue} onChange={setColorHue} />
        <Slider
          value={animationSpeed}
          label="Speed"
          min={MIN_SPEED}
          max={MAX_SPEED}
          onChange={setAnimationSpeed}
        />
        <Slider
          value={signHeight}
          label="Height"
          min={MIN_HEIGHT}
          max={MAX_HEIGHT}
          onChange={setSignHeight}
        />
      </FormMain>
      <FormOther>
        <FullWidthSwitch
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
        <FormButtons>
          <Button onClick={handleCloseMenu} className="apply-button">
            Apply
          </Button>
          <CopyLinkButton variant="outlined" />
          <Button onClick={handleReset} variant="outlined">
            Reset
          </Button>
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

const FullWidthSwitch = styled(Switch)`
  @media (max-width: ${MEDIA_QUERY.SIGN_WIDTH}) {
    display: none;
  }
`;

const FormButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: var(--padding-3);
  gap: var(--padding-3);
  .apply-button {
    display: none;
  }

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    grid-template-columns: repeat(3, 1fr);
    .apply-button {
      display: block;
    }
  }
  @media (max-width: ${MEDIA_QUERY.SMALL_MOBILE}) {
    grid-template-columns: 1fr 1fr;
    .apply-button {
      grid-column-end: span 2;
    }
  }
`;

export default MenuForm;
