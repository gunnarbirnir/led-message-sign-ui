import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { LEDMessageSign } from "@gunnarbirnir/led-message-sign";

const DEFAULT_TEXT = "LED Message Sign";

const App: FC = () => {
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
    <Container>
      <InnerContainer>
        <LEDMessageSign
          text={text}
          // height={50}
          // width={500}
          fullWidth
          colorHue={colorHue}
          // hideFrame
          // coloredOffLights={false}
          // animationFramesPerUpdate={1}
        />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: hsl(0deg 0% 0%);
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1000px;
`;

export default App;
