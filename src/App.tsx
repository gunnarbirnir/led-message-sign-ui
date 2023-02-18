import React, { FC, useMemo, useState, CSSProperties } from "react";
import styled from "styled-components";
import { LEDMessageSign } from "@gunnarbirnir/led-message-sign";

import { useSignConfig } from "./hooks";
import { AppContext } from "./context";
import { Menu, MenuButton } from "./components";
import { MENU_TRANSITION_DURATION } from "./constants";

const App: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signText, colorHue, input, updateSignConfigDebounced } =
    useSignConfig();

  const contextValue = useMemo(
    () => ({
      menuOpen,
      ...input,
      setMenuOpen,
      setSignText: (text: string) =>
        updateSignConfigDebounced({ signText: text }),
      setColorHue: (hue: number) =>
        updateSignConfigDebounced({ colorHue: hue }),
    }),
    [menuOpen, input, updateSignConfigDebounced]
  );

  const cssVariables = useMemo(
    () =>
      ({
        "--black": "hsl(0deg 0% 0%)",
        "--white": "hsl(0deg 0% 100%)",
        "--color-hue": `${colorHue}deg`,
        "--sign-max-width": "1000px",
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
          <LEDContainer className="w-100">
            <LEDMessageSign
              text={signText}
              // height={50}
              // width={500}
              fullWidth
              colorHue={colorHue}
              // hideFrame
              // coloredOffLights={false}
              // updatesPerSecond={1}
            />
          </LEDContainer>
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

const LEDContainer = styled.div`
  max-width: var(--sign-max-width);
`;

export default App;
