import React, { FC, useMemo, CSSProperties, PropsWithChildren } from "react";
import styled from "styled-components";

import { BaseProps } from "../../types";

interface ButtonProps extends BaseProps {
  onClick: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  style,
  onClick,
}) => {
  const cssVariables = useMemo(
    () =>
      ({
        "--button-padding": "10px 20px",
      } as CSSProperties),
    []
  );

  return (
    <StyledButton
      onClick={onClick}
      className={className}
      style={{ ...cssVariables, ...style }}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  color: var(--black);
  padding: var(--button-padding);
  border-radius: 1000px;
  background-color: hsl(var(--color-hue) 50% 50%);
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    transform: scale(1.05);
    background-color: hsl(var(--color-hue) 70% 50%);
  }
  &:active {
    transform: scale(0.95);
    background-color: hsl(var(--color-hue) 70% 50%);
  }
`;

export default Button;
