import { FC } from "react";
import styled from "styled-components";
import { LEDMessageSign } from "@gunnarbirnir/led-message-sign";

const App: FC = () => {
  return (
    <Container>
      <LEDMessageSign
        text="LED Message Sign"
        // height={200}
        // width={1000}
        // fullWidth
        // colorHue={180}
        // multiColor
        // hideFrame
        // animationFramesPerUpdate={20}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
  width: 100vw;
  background-color: hsl(0deg 0% 0%);
  color: hsl(0deg 0% 100%);
`;

export default App;
