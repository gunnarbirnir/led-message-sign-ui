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
          <CopyLinkButton />
          <Button onClick={handleReset}>Reset</Button>
        </FormButtons>
        <MobileFormButtons>
          <Button onClick={handleCloseMenu} className="apply-button">
            Apply
          </Button>
          <CopyLinkButton variant="outlined" />
          <Button onClick={handleReset} variant="outlined">
            Reset
          </Button>
        </MobileFormButtons>
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

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    display: none;
  }
`;

const MobileFormButtons = styled.div`
  display: none;
  grid-template-columns: repeat(3, 1fr);
  padding-top: var(--padding-3);
  gap: var(--padding-3);
  .apply-button {
    order: 3;
  }

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    display: grid;
  }
  @media (max-width: ${MEDIA_QUERY.SMALL_MOBILE}) {
    grid-template-columns: 1fr 1fr;
    .apply-button {
      order: unset;
      grid-column-end: span 2;
    }
  }
`;

export default MenuForm;
