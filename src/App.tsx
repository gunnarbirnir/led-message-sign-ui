import React, { FC, useMemo, useState, CSSProperties } from "react";
import styled from "styled-components";
import { LEDMessageSign } from "@gunnarbirnir/led-message-sign";

import { useSignConfig } from "./hooks";
import { AppContext } from "./context";
import { Menu, MenuButton } from "./components";
import {
  MENU_TRANSITION_DURATION,
  SPEED_TO_UPDATES,
  SIGN_DEFAULT_WIDTH,
} from "./constants";

const App: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    input,
    signText,
    colorHue,
    animationSpeed,
    signHeight,
    fullWidth,
    hideFrame,
    coloredOffLights,
    updateSignConfig,
    updateSignConfigDebounced,
    resetSignConfig,
  } = useSignConfig();

  const contextValue = useMemo(
    () => ({
      menuOpen,
      ...input,
      setMenuOpen,
      resetSignConfig,
      setSignText: (signText: string) =>
        updateSignConfigDebounced({ signText }),
      setColorHue: (colorHue: number) =>
        updateSignConfigDebounced({ colorHue }),
      setAnimationSpeed: (animationSpeed: number) =>
        updateSignConfigDebounced({ animationSpeed }),
      setSignHeight: (signHeight: number) =>
        updateSignConfigDebounced({ signHeight }),
      setFullWidth: (fullWidth: boolean) => updateSignConfig({ fullWidth }),
      setHideFrame: (hideFrame: boolean) => updateSignConfig({ hideFrame }),
      setColoredOffLights: (coloredOffLights: boolean) =>
        updateSignConfig({ coloredOffLights }),
    }),
    [
      menuOpen,
      input,
      updateSignConfig,
      updateSignConfigDebounced,
      resetSignConfig,
    ]
  );

  const cssVariables = useMemo(
    () =>
      ({
        "--black": "hsl(0deg 0% 0%)",
        "--white": "hsl(0deg 0% 100%)",
        "--color-hue": `${colorHue}deg`,
        "--main-content-min-width": "300px",
        "--border-width": "2px",
        "--border-color": "hsl(0deg 0% 20%)",
        "--border-radius": "5px",
        "--menu-transition-duration": `${MENU_TRANSITION_DURATION}ms`,
        "--menu-transition-timing-function": "ease-out",
        "--padding-1": "5px",
        "--padding-2": "10px",
        "--padding-3": "20px",
        "--padding-4": "40px",
        "--icon-button-size": "40px",
      } as CSSProperties),
    [colorHue]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <AppContainer className="d-f fd-c" style={cssVariables}>
        <MainContent className="f-1 d-f fd-c jc-c ai-c pos-r">
          <div className="d-f fd-r jc-c w-100">
            <LEDMessageSign
              text={signText}
              height={signHeight}
              // TODO: Handle smaller screens
              width={SIGN_DEFAULT_WIDTH}
              fullWidth={fullWidth}
              colorHue={colorHue}
              hideFrame={hideFrame}
              coloredOffLights={coloredOffLights}
              updatesPerSecond={SPEED_TO_UPDATES[animationSpeed]}
            />
          </div>
          <MenuButton />
        </MainContent>
        <Menu />
      </AppContainer>
    </AppContext.Provider>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--black);
  overflow: hidden;
`;

const MainContent = styled.main`
  min-height: var(--main-content-min-width);
`;

export default App;
