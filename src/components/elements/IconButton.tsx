import React, { FC, useMemo, CSSProperties } from "react";
import styled from "styled-components";
import cn from "classnames";

import { BaseProps } from "../../types";
import { MEDIA_QUERY } from "../../constants";

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
  }
  :active {
    transform: scale(0.95);
  }
  svg {
    height: var(--button-icon-size);
    width: var(--button-icon-size);
    fill: var(--black);
  }

  @media (min-width: ${MEDIA_QUERY.MOBILE}) {
    :hover,
    :active {
      background-color: var(--primary-color-saturated);
    }
  }
`;

export default IconButton;
