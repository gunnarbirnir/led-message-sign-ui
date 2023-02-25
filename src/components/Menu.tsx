import React, { FC, useMemo, CSSProperties } from "react";
import styled from "styled-components";
import cn from "classnames";

import { useAppContext } from "../hooks";
import { MEDIA_QUERY } from "../constants";
import MenuForm from "./MenuForm";

const Menu: FC = () => {
  const { menuOpen } = useAppContext();
  const cssVariables = useMemo(
    () =>
      ({
        "--menu-height": "400px",
        "--menu-content-max-width": "1000px",
      } as CSSProperties),
    []
  );

  return (
    <StyledMenu className={cn({ "menu-open": menuOpen })} style={cssVariables}>
      <MenuContainer className="h-100 d-f fd-r jc-c">
        <MenuContent className="w-100">
          <MenuForm />
        </MenuContent>
      </MenuContainer>
    </StyledMenu>
  );
};

const StyledMenu = styled.aside`
  z-index: 0;
  height: 0px;
  transition-property: height;
  will-change: height;
  transition-duration: var(--menu-transition-duration);
  transition-timing-function: var(--menu-transition-timing-function);
  overflow: hidden;
  &.menu-open {
    height: var(--menu-height);
  }

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 0%;
    width: 100%;
    &.menu-open {
      height: 100%;
    }
  }
`;

const MenuContainer = styled.div`
  background-color: var(--background-color);
  border-top: var(--border-width) solid var(--dark-gray);
  overflow-y: auto;
  padding: var(--padding-3);
  padding-bottom: var(--padding-4);

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    border-width: 0px;
    padding-top: calc(
      var(--icon-button-size) + var(--padding-3) + var(--padding-4)
    );
  }
`;

const MenuContent = styled.div`
  max-width: var(--menu-content-max-width);
  :after {
    content: "";
    display: block;
    height: var(--padding-4);
    width: 100%;
  }
`;

export default Menu;
