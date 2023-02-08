import React, { FC, useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import { debounce } from "debounce";
import { LEDMessageSign } from "@gunnarbirnir/led-message-sign";

import { Menu, MenuButton } from "./components";

const DEFAULT_TEXT = "LED Message Sign";

const App: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [signText, setSignText] = useState("");

  const { colorHue } = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const textParam = urlParams.get("text");
    const hueParam = urlParams.get("hue");
    const hueNum = parseInt(hueParam || "0");
    const initText = textParam ? decodeURIComponent(textParam) : DEFAULT_TEXT;
    const colorHue = isNaN(hueNum) ? 0 : hueNum;

    setSignText(initText);
    setTextInput(initText);
    return { colorHue };
  }, []);

  const updateSignText = useMemo(
    () =>
      debounce((text: string) => {
        setSignText(text);
        const url = new URL(window.location.href);
        if (text) {
          url.searchParams.set("text", encodeURIComponent(text.toLowerCase()));
        } else {
          url.searchParams.delete("text");
        }
        window.history.replaceState({}, "", url);
      }, 500),
    []
  );

  const updateTextInput = useCallback(
    (text: string) => {
      setTextInput(text);
      updateSignText(text);
    },
    [updateSignText]
  );

  return (
    <AppContainer>
      <MainContent>
        <LEDContainer>
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
        <MenuButton
          menuOpen={menuOpen}
          colorHue={colorHue}
          setMenuOpen={setMenuOpen}
        />
      </MainContent>
      <Menu
        text={textInput}
        menuOpen={menuOpen}
        colorHue={colorHue}
        setText={updateTextInput}
      />
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
