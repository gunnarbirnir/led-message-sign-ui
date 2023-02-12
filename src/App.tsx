import React, {
  FC,
  useMemo,
  useState,
  useCallback,
  CSSProperties,
} from "react";
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
        "--menu-transition-duration": "200ms",
        "--menu-transition-timing-function": "ease-out",
        "--padding-1": "5px",
        "--padding-2": "10px",
        "--padding-3": "20px",
        "--padding-4": "40px",
      } as CSSProperties),
    [colorHue]
  );

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
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </MainContent>
      <Menu text={textInput} menuOpen={menuOpen} setText={updateTextInput} />
    </AppContainer>
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
