import React, { FC, useMemo, useState } from "react";
import styled from "styled-components";
import { LEDMessageSign } from "@gunnarbirnir/led-message-sign";

import { Menu, MenuButton } from "./components";

const DEFAULT_TEXT = "LED Message Sign";

const App: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { text, colorHue } = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const textParam = urlParams.get("text");
    const hueParam = urlParams.get("hue");
    const hueNum = parseInt(hueParam || "0");

    const text = textParam ? decodeURIComponent(textParam) : DEFAULT_TEXT;
    const colorHue = isNaN(hueNum) ? 0 : hueNum;

    return { text, colorHue };
  }, []);

  if (!text) {
    return null;
  }

  return (
    <AppContainer>
      <MainContent>
        <LEDContainer>
          <LEDMessageSign
            text={text}
            // height={50}
            // width={500}
            fullWidth
            colorHue={colorHue}
            // hideFrame
            // coloredOffLights={false}
            // updatesPerSecond={1}
          />
        </LEDContainer>
        <MenuButton
          menuOpen={menuOpen}
          colorHue={colorHue}
          setMenuOpen={setMenuOpen}
        />
      </MainContent>
      <Menu menuOpen={menuOpen} />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: hsl(0deg 0% 0%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 300px;
`;

const LEDContainer = styled.div`
  width: 100%;
  max-width: 1000px;
`;

export default App;
