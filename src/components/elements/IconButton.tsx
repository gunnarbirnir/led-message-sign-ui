import React, { FC, useMemo, CSSProperties } from "react";
import styled from "styled-components";
import cn from "classnames";

import { BaseProps } from "../../types";

interface IconButtonProps extends BaseProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

const IconButton: FC<IconButtonProps> = ({
  icon: Icon,
  className,
  style,
  onClick,
}) => {
  const cssVariables = useMemo(
    () =>
      ({
        "--button-icon-size": "20px",
      } as CSSProperties),
    []
  );

  return (
    <StyledIconButton
      onClick={onClick}
      className={cn("d-f jc-c ai-c", className)}
      style={{ ...cssVariables, ...style }}
    >
      <Icon />
    </StyledIconButton>
  );
};

const StyledIconButton = styled.button`
  height: var(--icon-button-size);
  width: var(--icon-button-size);
  border-radius: var(--border-radius-round);
  background-color: var(--primary-color-light);

  :hover {
    transform: scale(1.05);
    background-color: var(--primary-color-saturated);
  }
  :active {
    transform: scale(0.95);
    background-color: var(--primary-color-saturated);
  }
  svg {
    height: var(--button-icon-size);
    width: var(--button-icon-size);
    fill: var(--black);
  }
`;

export default IconButton;
