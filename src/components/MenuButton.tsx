import React, { FC } from "react";
import styled from "styled-components";
import cn from "classnames";

import { SettingsIcon, CloseIcon } from "../icons";

interface IProps {
  menuOpen: boolean;
  colorHue: number;
  setMenuOpen: (open: boolean) => void;
}

const BUTTON_SIZE = 40;
const SETTINGS_ICON_SIZE = 25;
const CLOSE_ICON_SIZE = 20;

const MenuButton: FC<IProps> = ({ menuOpen, colorHue, setMenuOpen }) => {
  return (
    <StyledMenuButton
      colorHue={colorHue}
      onClick={() => setMenuOpen(!menuOpen)}
      className={cn({ "menu-button-open": menuOpen })}
    >
      {menuOpen ? <StyledCloseIcon /> : <StyledSettingsIcon />}
    </StyledMenuButton>
  );
};

const StyledMenuButton = styled.button<{ colorHue: number }>`
  z-index: 1000;
  position: absolute;
  right: 40px;
  bottom: 40px;
  height: ${BUTTON_SIZE}px;
  width: ${BUTTON_SIZE}px;
  border-radius: ${BUTTON_SIZE / 2}px;
  cursor: pointer;
  border: none;
  outline: 0;
  user-select: none;
  transition: bottom 200ms ease-out;
  background-color: ${({ colorHue }) => `hsl(${colorHue}deg 100% 60%)`};

  &:hover {
    transform: scale(1.05);
    background-color: ${({ colorHue }) => `hsl(${colorHue}deg 100% 55%)`};
  }
  &:active {
    transform: scale(0.95);
    background-color: ${({ colorHue }) => `hsl(${colorHue}deg 100% 55%)`};
  }
  &.menu-button-open {
    bottom: -${BUTTON_SIZE + 30}px;
  }

  svg {
    position: absolute;
    pointer-events: none;
    fill: hsl(0deg 0% 0%);
  }
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  top: ${(BUTTON_SIZE - SETTINGS_ICON_SIZE) / 2}px;
  left: ${(BUTTON_SIZE - SETTINGS_ICON_SIZE) / 2}px;
  height: ${SETTINGS_ICON_SIZE}px;
  width: ${SETTINGS_ICON_SIZE}px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  top: ${(BUTTON_SIZE - CLOSE_ICON_SIZE) / 2}px;
  left: ${(BUTTON_SIZE - CLOSE_ICON_SIZE) / 2}px;
  height: ${CLOSE_ICON_SIZE}px;
  width: ${CLOSE_ICON_SIZE}px;
`;

export default MenuButton;
