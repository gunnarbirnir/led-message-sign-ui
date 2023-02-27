import React, { FC, useMemo, CSSProperties, useCallback } from "react";
import styled from "styled-components";
import cn from "classnames";

import { useAppContext } from "../hooks";
import { SettingsIcon, CloseIcon } from "../icons";
import { MEDIA_QUERY } from "../constants";
import { IconButton } from "./elements";

const MenuButton: FC = () => {
  const { menuOpen, setMenuOpen } = useAppContext();
  const icon = useMemo(() => (menuOpen ? CloseIcon : SettingsIcon), [menuOpen]);

  const cssVariables = useMemo(
    () =>
      ({
        "--menu-button-icon-size": `${menuOpen ? 20 : 25}px`,
      } as CSSProperties),
    [menuOpen]
  );

  const handleSetMenuOpen = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen, setMenuOpen]);

  return (
    <StyledIconButton
      icon={icon}
      onClick={handleSetMenuOpen}
      style={cssVariables}
      className={cn("pos-a", { "menu-button-open": menuOpen })}
    />
  );
};

const StyledIconButton = styled(IconButton)`
  z-index: 1000;
  right: var(--padding-4);
  bottom: var(--padding-4);
  transition-property: bottom;
  will-change: bottom;
  transition-duration: var(--menu-transition-duration);
  transition-timing-function: var(--menu-transition-timing-function);

  &.menu-button-open {
    bottom: calc(
      -1 * (var(--icon-button-size) + var(--padding-3) + var(--border-width))
    );
  }
  svg {
    height: var(--menu-button-icon-size);
    width: var(--menu-button-icon-size);
  }

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    position: fixed;
    top: var(--padding-3);
    right: var(--padding-3);
    transition-property: none;
  }
`;

export default MenuButton;
