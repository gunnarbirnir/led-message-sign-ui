import React, { FC, useMemo, CSSProperties } from "react";
import styled from "styled-components";
import cn from "classnames";

import TextArea from "./TextArea";
import HueSlider from "./HueSlider";

interface IProps {
  menuOpen: boolean;
  text: string;
  colorHue: number;
  setText: (text: string) => void;
  setColorHue: (hue: number) => void;
}

const Menu: FC<IProps> = ({
  menuOpen,
  text,
  colorHue,
  setText,
  setColorHue,
}) => {
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
          <TextArea value={text} onChange={setText} menuOpen={menuOpen} />
          <HueSlider value={colorHue} onChange={setColorHue} />
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
