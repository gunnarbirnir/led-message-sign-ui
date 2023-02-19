import React, { FC } from "react";
import styled from "styled-components";
import cn from "classnames";
import * as Switch from "@radix-ui/react-switch";

import { BaseProps } from "../../types";

interface SwitchProps extends BaseProps {
  checked: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}

const SwitchComp: FC<SwitchProps> = ({
  checked,
  label,
  onCheckedChange,
  className,
  style,
}) => {
  return (
    <SwitchContainer className={cn("d-f fd-r", className)} style={style}>
      <StyledSwitch checked={checked} onCheckedChange={onCheckedChange}>
        <SwitchThumb />
      </StyledSwitch>
      {/* TODO: Make label clickable */}
      <p>{label}</p>
    </SwitchContainer>
  );
};

const SwitchContainer = styled.div`
  gap: var(--padding-2);
  p {
    color: var(--white);
    font-size: 15px;
    font-weight: 500;
  }
`;

const StyledSwitch = styled(Switch.Root)`
  width: 42px;
  height: 25px;
  background-color: var(--border-color);
  border-radius: 1000px;
  position: relative;

  &[data-state="checked"] {
    background-color: hsl(var(--color-hue) 50% 50%);
  }
`;

const SwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: var(--black);
  border-radius: 1000px;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;

export default SwitchComp;
