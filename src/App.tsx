import React, { FC, useMemo, useState, CSSProperties } from "react";
import styled from "styled-components";
import { LEDMessageSign } from "@gunnarbirnir/led-message-sign";

import { useSignConfig } from "./hooks";
import { AppContext } from "./context";
import { Menu, MenuButton } from "./components";
import {
  MENU_TRANSITION_DURATION,
  SIGN_DEFAULT_WIDTH,
  SPEED_TO_FPU,
} from "./constants";
import { formatSignText } from "./utils";

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
  const formattedSignText = useMemo(() => formatSignText(signText), [signText]);

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
        "--medium-gray": "hsl(0deg 0% 30%)",
        "--dark-gray": "hsl(0deg 0% 20%)",
        "--background-color": "hsl(0deg 0% 3%)",
        "--color-hue": `${colorHue}deg`,
        "--primary-color-light": `hsl(${colorHue}deg 100% 70%)`,
        "--primary-color-faded": `hsl(${colorHue}deg 50% 50%)`,
        "--primary-color-saturated": `hsl(${colorHue}deg 100% 60%)`,
        "--main-content-min-height": "300px",
        "--border-width": "2px",
        "--border-radius": "5px",
        "--border-radius-round": "1000px",
        "--menu-transition-duration": `${MENU_TRANSITION_DURATION}ms`,
        "--menu-transition-timing-function": "ease-out",
        "--padding-1": "5px",
        "--padding-2": "10px",
        "--padding-3": "20px",
        "--padding-4": "40px",
        "--font-size-sm": "12px",
        "--font-size-md": "14px",
        "--font-size-lg": "15px",
        "--font-weight-light": "500",
        "--font-weight-medium": "600",
        "--box-shadow-normal": "0 2px 10px 2px hsl(0deg 0% 0% / 0.8)",
        "--box-shadow-solid": "0 0 0 5px hsl(0deg 0% 0% / 0.5)",
        "--icon-button-size": "40px",
      } as CSSProperties),
    [colorHue]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <AppContainer className="d-f fd-c" style={cssVariables}>
        <MainContent className="f-1 d-f fd-c jc-c ai-c pos-r">
          <LEDMessageSign
            text={formattedSignText}
            height={signHeight}
            // TODO: Handle smaller screens
            width={SIGN_DEFAULT_WIDTH}
            fullWidth={fullWidth}
            colorHue={colorHue}
            hideFrame={hideFrame}
            coloredOffLights={coloredOffLights}
            animationFramesPerUpdate={SPEED_TO_FPU[animationSpeed]}
          />
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
  min-height: var(--main-content-min-height);
`;

export default App;
