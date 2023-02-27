import React, { FC, PropsWithChildren, useMemo } from "react";
import styled from "styled-components";
import cn from "classnames";

import { BaseProps } from "../../types";
import { MEDIA_QUERY } from "../../constants";

interface ButtonProps extends BaseProps {
  variant?: "filled" | "outlined";
  onClick: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant = "filled",
  className,
  style,
  onClick,
}) => {
  const isOutlined = useMemo(() => variant === "outlined", [variant]);

  return (
    <StyledButton
      onClick={onClick}
      className={cn({ "outlined-button": isOutlined }, className)}
      style={style}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  color: var(--black);
  padding: var(--padding-2) var(--padding-3);
  border-radius: var(--border-radius-round);
  background-color: var(--primary-color-light);
  text-transform: uppercase;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);

  :hover {
    transform: scale(1.02);
  }
  :active {
    transform: scale(0.98);
  }

  &.outlined-button {
    background-color: var(--background-color);
    border: var(--border-width) solid var(--primary-color-light);
    color: var(--primary-color-light);
  }

  @media (min-width: ${MEDIA_QUERY.MOBILE}) {
    :hover,
    :active {
      background-color: var(--primary-color-saturated);
      &.outlined-button {
        background-color: var(--background-color);
        border-color: var(--primary-color-saturated);
        color: var(--primary-color-saturated);
      }
    }
  }
`;

export default Button;
