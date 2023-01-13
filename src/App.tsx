import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { LEDMessageSign } from "@gunnarbirnir/led-message-sign";

const DEFAULT_TEXT = "LED Message Sign";

const App: FC = () => {
  const messageText = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initText = urlParams.get("text");

    return initText ? decodeURIComponent(initText) : DEFAULT_TEXT;
  }, []);

  if (!messageText) {
    return null;
  }

  return (
    <Container>
      <InnerContainer>
        <LEDMessageSign
          text={messageText}
          height={180}
          // width={1000}
          fullWidth
          // colorHue={180}
          multiColor
          // hideFrame
          // coloredOffLights={false}
          // animationFramesPerUpdate={20}
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
