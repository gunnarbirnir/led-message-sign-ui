import React, { FC, useMemo } from "react";
import styled from "styled-components";
import cn from "classnames";

import { useAppContext } from "../hooks";
import { SettingsIcon, CloseIcon } from "../icons";
import { IconButton } from "./elements";

const MenuButton: FC = () => {
  const { menuOpen, setMenuOpen } = useAppContext();
  const icon = useMemo(() => (menuOpen ? CloseIcon : SettingsIcon), [menuOpen]);
  const iconSize = useMemo(() => (menuOpen ? 20 : 25), [menuOpen]);

  return (
    <StyledIconButton
      icon={icon}
      iconSize={iconSize}
      onClick={() => setMenuOpen(!menuOpen)}
      className={cn("pos-a", { "menu-button-open": menuOpen })}
    />
  );
};

const StyledIconButton = styled(IconButton)`
  z-index: 1000;
  right: var(--padding-4);
  bottom: var(--padding-4);
  transition-property: bottom;
  transition-duration: var(--menu-transition-duration);
  transition-timing-function: var(--menu-transition-timing-function);

  &.menu-button-open {
    bottom: calc(
      -1 * (var(--icon-button-size) + var(--padding-3) + var(--border-width))
    );
  }
`;

export default MenuButton;