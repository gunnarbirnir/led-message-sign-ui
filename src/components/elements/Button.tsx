import React, { FC, PropsWithChildren } from "react";
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
  return (
    <StyledButton onClick={onClick} className={className} style={style}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  color: var(--black);
  padding: var(--padding-2) var(--padding-3);
  border-radius: 1000px;
  background-color: hsl(var(--color-hue) 100% 70%);
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    transform: scale(1.02);
    background-color: hsl(var(--color-hue) 100% 60%);
  }
  &:active {
    transform: scale(0.98);
    background-color: hsl(var(--color-hue) 100% 60%);
  }
`;

export default Button;
