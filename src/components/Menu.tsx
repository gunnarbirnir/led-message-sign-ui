import React, { FC } from "react";
import styled from "styled-components";
import cn from "classnames";

interface IProps {
  menuOpen: boolean;
}

const Menu: FC<IProps> = ({ menuOpen }) => {
  return <StyledMenu className={cn({ "menu-open": menuOpen })} />;
};

const StyledMenu = styled.div`
  z-index: 0;
  height: 0px;
  transition: height 200ms ease-out;
  background-color: hsl(0deg 0% 3%);
  border-top: 2px solid hsl(0deg 0% 20%);
  transform: translateY(2px);
  overflow-y: scroll;

  &.menu-open {
    height: 300px;
  }
`;

export default Menu;
