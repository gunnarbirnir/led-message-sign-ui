import React, { FC, useMemo, CSSProperties } from "react";
import styled from "styled-components";
import cn from "classnames";

import { useAppContext, useFocusSignTextArea } from "../hooks";
import { TextArea, HueSlider, Slider } from "./elements";

const Menu: FC = () => {
  const {
    menuOpen,
    signText,
    colorHue,
    animationSpeed,
    setSignText,
    setColorHue,
    setAnimationSpeed,
  } = useAppContext();
  const textAreaRef = useFocusSignTextArea(menuOpen);

  const cssVariables = useMemo(
    () =>
      ({
        "--menu-height": "300px",
        "--menu-content-max-width": "1000px",
        "--menu-background-color": "hsl(0deg 0% 3%)",
      } as CSSProperties),
    []
  );

  return (
    <StyledMenu className={cn({ "menu-open": menuOpen })} style={cssVariables}>
      <MenuContainer className="h-100 d-f jc-c">
        <MenuContent className="w-100 d-f fd-c">
          <TextArea
            ref={textAreaRef}
            value={signText}
            height={100}
            maxLength={100}
            onChange={setSignText}
          />
          <HueSlider value={colorHue} onChange={setColorHue} />
          <Slider
            min={0}
            max={9}
            value={animationSpeed}
            onChange={setAnimationSpeed}
          />
        </MenuContent>
      </MenuContainer>
    </StyledMenu>
  );
};

const StyledMenu = styled.div`
  z-index: 0;
  height: 0px;
  transition-property: height, padding;
  transition-duration: var(--menu-transition-duration);
  transition-timing-function: var(--menu-transition-timing-function);

  &.menu-open {
    height: var(--menu-height);
  }
`;

const MenuContainer = styled.div`
  background-color: var(--menu-background-color);
  border-top: var(--border-width) solid var(--border-color);
  overflow-y: scroll;
  padding: var(--padding-3);
  padding-bottom: var(--padding-4);
`;

const MenuContent = styled.div`
  max-width: var(--menu-content-max-width);
  gap: var(--padding-4);
`;

export default Menu;
