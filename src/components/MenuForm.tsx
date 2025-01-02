import React, { FC, useCallback } from "react";
import styled from "styled-components";

import { useAppContext, useFocusSignTextArea } from "../hooks";
import {
  MEDIA_QUERY,
  MIN_SPEED,
  MAX_SPEED,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_ON_BULB_LIGHTNESS,
  MAX_ON_BULB_LIGHTNESS,
  MIN_OFF_BULB_LIGHTNESS,
  MAX_OFF_BULB_LIGHTNESS,
  MIN_FRAME_LIGHTNESS,
  MAX_FRAME_LIGHTNESS,
  MIN_BACKGROUND_LIGHTNESS,
  MAX_BACKGROUND_LIGHTNESS,
  MIN_STATIC_MODE_DELAY,
  MAX_STATIC_MODE_DELAY,
} from "../constants";
import { TextArea, HueSlider, Slider, Button, Switch } from "./elements";
import CopyLinkButton from "./CopyLinkButton";

const MenuForm: FC = () => {
  const {
    menuOpen,
    signText,
    colorHue,
    onBulbLightness,
    offBulbLightness,
    frameLightness,
    backgroundLightness,
    animationSpeed,
    signHeight,
    fullWidth,
    hideFrame,
    coloredOffLights,
    staticMode,
    staticModeDelay,
    setMenuOpen,
    resetSignConfig,
    setSignText,
    setColorHue,
    setOnBulbLightness,
    setOffBulbLightness,
    setFrameLightness,
    setBackgroundLightness,
    setAnimationSpeed,
    setSignHeight,
    setFullWidth,
    setHideFrame,
    setColoredOffLights,
    setStaticMode,
    setStaticModeDelay,
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
      <FormLeft>
        <div>
          <TextArea
            ref={textAreaRef}
            value={signText}
            height={100}
            maxLength={100}
            placeholder="Sign Text (separate by line for multiple messages)"
            onChange={setSignText}
          />
        </div>
        <HueSlider value={colorHue} onChange={setColorHue} />
        <SectionLabel>Lightness</SectionLabel>
        <Slider
          value={onBulbLightness}
          label="On Bulbs"
          min={MIN_ON_BULB_LIGHTNESS}
          max={MAX_ON_BULB_LIGHTNESS}
          onChange={setOnBulbLightness}
        />
        <Slider
          value={offBulbLightness}
          label="Off Bulbs"
          min={MIN_OFF_BULB_LIGHTNESS}
          max={MAX_OFF_BULB_LIGHTNESS}
          onChange={setOffBulbLightness}
        />
        <Slider
          value={frameLightness}
          label="Frame"
          min={MIN_FRAME_LIGHTNESS}
          max={MAX_FRAME_LIGHTNESS}
          onChange={setFrameLightness}
        />
        <Slider
          value={backgroundLightness}
          label="Background"
          min={MIN_BACKGROUND_LIGHTNESS}
          max={MAX_BACKGROUND_LIGHTNESS}
          onChange={setBackgroundLightness}
        />
      </FormLeft>
      <FormRight>
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
        <Switch
          label="Static Mode"
          checked={staticMode}
          onCheckedChange={setStaticMode}
        />
        <RightSliders>
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
          <Slider
            value={staticModeDelay}
            label="Static Mode Delay"
            min={MIN_STATIC_MODE_DELAY}
            max={MAX_STATIC_MODE_DELAY}
            disabled={!staticMode}
            onChange={setStaticModeDelay}
          />
        </RightSliders>
        <FormButtons>
          <Button onClick={handleCloseMenu} className="apply-button">
            Apply
          </Button>
          <CopyLinkButton variant="outlined" />
          <Button onClick={handleReset} variant="outlined">
            Reset
          </Button>
        </FormButtons>
      </FormRight>
    </StyledMenuForm>
  );
};

const StyledMenuForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--padding-4);

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    grid-template-columns: 1fr;
    gap: var(--padding-3);
  }
`;

const FormLeft = styled.div`
  > * {
    padding-bottom: var(--padding-3);
  }
`;

const SectionLabel = styled.p`
  text-transform: uppercase;
  color: var(--light-gray);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding-bottom: var(--padding-3);
  -webkit-text-size-adjust: 100%;
`;

const FormRight = styled.div`
  > * {
    padding-bottom: var(--padding-3);
  }
`;

const RightSliders = styled.div`
  padding-top: var(--padding-3);
  padding-bottom: var(--padding-3);
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
