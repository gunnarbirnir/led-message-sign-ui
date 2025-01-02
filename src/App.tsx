import React, { FC, useMemo, useState, CSSProperties } from "react";
import styled from "styled-components";
import { LEDMessageSign } from "@gunnarbirnir/led-message-sign";

import {
  useSignConfig,
  useWindowDimensions,
  useFullWidthToggleInProgress,
  useCssVariables,
  useAppContextValue,
} from "./hooks";
import { AppContext } from "./context";
import { Menu, MenuButton } from "./components";
import { SIGN_DEFAULT_WIDTH, MAX_SPEED, MIN_SPEED, S_TO_MS } from "./constants";
import { formatSignText } from "./utils";

const App: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    input,
    initialized,
    signText,
    colorHue,
    animationSpeed,
    signHeight,
    fullWidth,
    hideFrame,
    coloredOffLights,
    onBulbLightness,
    offBulbLightness,
    frameLightness,
    backgroundLightness,
    staticMode,
    staticModeDelay,
    updateSignConfig,
    updateSignConfigDebounced,
    resetSignConfig,
  } = useSignConfig();

  const { width: windowWidth } = useWindowDimensions();
  const fullWidthToggleInProgress = useFullWidthToggleInProgress(fullWidth);
  const hideSign = useMemo(
    () => !initialized || fullWidthToggleInProgress,
    [initialized, fullWidthToggleInProgress]
  );
  const formattedSignText = useMemo(() => formatSignText(signText), [signText]);
  const signFullWidth = useMemo(
    () => fullWidth || windowWidth < SIGN_DEFAULT_WIDTH,
    [fullWidth, windowWidth]
  );
  const animationFramesPerUpdate = useMemo(
    () => MAX_SPEED + MIN_SPEED - animationSpeed,
    [animationSpeed]
  );
  const staticModeDelayMs = useMemo(
    () => staticModeDelay * S_TO_MS,
    [staticModeDelay]
  );
  const signStyle = useMemo(
    () => ({ visibility: hideSign ? "hidden" : "visible" } as CSSProperties),
    [hideSign]
  );
  const cssVariables = useCssVariables(colorHue);

  const contextValue = useAppContextValue({
    input,
    menuOpen,
    setMenuOpen,
    updateSignConfig,
    updateSignConfigDebounced,
    resetSignConfig,
  });

  return (
    <AppContext.Provider value={contextValue}>
      <AppContainer className="d-f fd-c" style={cssVariables}>
        <MainContent className="f-1 d-f fd-c jc-c ai-c pos-r">
          <LEDMessageSign
            text={formattedSignText}
            height={signHeight}
            width={SIGN_DEFAULT_WIDTH}
            fullWidth={signFullWidth}
            colorHue={colorHue}
            onBulbLightness={onBulbLightness}
            offBulbLightness={offBulbLightness}
            frameLightness={frameLightness}
            backgroundLightness={backgroundLightness}
            hideFrame={hideFrame}
            coloredOffLights={coloredOffLights}
            animationFramesPerUpdate={animationFramesPerUpdate}
            staticMode={staticMode}
            staticModeDelay={staticModeDelayMs}
            style={signStyle}
          />
          <MenuButton />
        </MainContent>
        <Menu />
      </AppContainer>
    </AppContext.Provider>
  );
};

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--black);
  overflow: hidden;
`;

const MainContent = styled.main`
  min-height: var(--main-content-min-height);
`;

export default App;
