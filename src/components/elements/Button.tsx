import React, { FC, PropsWithChildren } from "react";
import styled from "styled-components";

import { BaseProps } from "../../types";
import { MEDIA_QUERY } from "../../constants";

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

  @media (min-width: ${MEDIA_QUERY.MOBILE}) {
    :hover,
    :active {
      background-color: var(--primary-color-saturated);
    }
  }
`;

export default Button;
