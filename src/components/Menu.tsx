import React, { FC } from "react";
import styled from "styled-components";
import cn from "classnames";

import TextArea from "./TextArea";

interface IProps {
  menuOpen: boolean;
  colorHue: number;
  text: string;
  setText: (text: string) => void;
}

const Menu: FC<IProps> = ({ menuOpen, colorHue, text, setText }) => {
  return (
    <StyledMenu className={cn({ "menu-open": menuOpen })}>
      <MenuContainer>
        <MenuContent>
          <TextArea
            value={text}
            colorHue={colorHue}
            onChange={setText}
            menuOpen={menuOpen}
          />
        </MenuContent>
      </MenuContainer>
    </StyledMenu>
  );
};

const StyledMenu = styled.div`
  z-index: 0;
  height: 0px;
  transition: height 200ms ease-out, padding 200ms ease-out;
  &.menu-open {
    height: 300px;
  }
`;

const MenuContainer = styled.div`
  height: 100%;
  background-color: hsl(0deg 0% 3%);
  border-top: 2px solid hsl(0deg 0% 20%);
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  padding: 20px;
  padding-bottom: 40px;
`;

const MenuContent = styled.div`
  width: 100%;
  max-width: 1000px;
`;

export default Menu;
