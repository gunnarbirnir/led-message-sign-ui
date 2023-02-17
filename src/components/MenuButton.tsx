import React, { FC, useMemo, CSSProperties } from "react";
import styled from "styled-components";
import cn from "classnames";

import { useAppContext } from "../hooks";
import { SettingsIcon, CloseIcon } from "../icons";

const MenuButton: FC = () => {
  const { menuOpen, setMenuOpen } = useAppContext();

  const cssVariables = useMemo(
    () =>
      ({
        "--menu-button-size": "40px",
        "--settings-icon-size": "25px",
        "--close-icon-size": "20px",
        "--menu-button-lightness": "60%",
        "--menu-button-active-lightness": "65%",
      } as CSSProperties),
    []
  );

  return (
    <StyledMenuButton
      onClick={() => setMenuOpen(!menuOpen)}
      className={cn("pos-a", { "menu-button-open": menuOpen })}
      style={cssVariables}
    >
      {menuOpen ? (
        <StyledCloseIcon className="pos-a" />
      ) : (
        <StyledSettingsIcon className="pos-a" />
      )}
    </StyledMenuButton>
  );
};

const StyledMenuButton = styled.button`
  z-index: 1000;
  right: var(--padding-4);
  bottom: var(--padding-4);
  height: var(--menu-button-size);
  width: var(--menu-button-size);
  border-radius: calc(var(--menu-button-size) / 2);
  transition-property: bottom;
  transition-duration: var(--menu-transition-duration);
  transition-timing-function: var(--menu-transition-timing-function);
  background-color: hsl(var(--color-hue) 100% var(--menu-button-lightness));

  &:hover {
    transform: scale(1.05);
    background-color: hsl(
      var(--color-hue) 100% var(--menu-button-active-lightness)
    );
  }
  &:active {
    transform: scale(0.95);
    background-color: hsl(
      var(--color-hue) 100% var(--menu-button-active-lightness)
    );
  }
  &.menu-button-open {
    bottom: calc(
      -1 * (var(--menu-button-size) + var(--padding-3) + var(--border-width))
    );
  }
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  fill: var(--black);
  top: calc((var(--menu-button-size) - var(--settings-icon-size)) / 2);
  left: calc((var(--menu-button-size) - var(--settings-icon-size)) / 2);
  height: var(--settings-icon-size);
  width: var(--settings-icon-size);
`;

const StyledCloseIcon = styled(CloseIcon)`
  fill: var(--black);
  top: calc((var(--menu-button-size) - var(--close-icon-size)) / 2);
  left: calc((var(--menu-button-size) - var(--close-icon-size)) / 2);
  height: var(--close-icon-size);
  width: var(--close-icon-size);
`;

export default MenuButton;
