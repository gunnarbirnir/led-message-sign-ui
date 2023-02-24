import React, { FC, useId, useMemo, CSSProperties } from "react";
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
  const switchId = useId();
  const cssVariables = useMemo(
    () =>
      ({
        "--switch-height": "25px",
        "--switch-width": "42px",
        "--switch-thumb-size": "21px",
        "--switch-border-width": "2px",
        "--switch-transition-duration": "100ms",
      } as CSSProperties),
    []
  );

  return (
    <SwitchContainer
      className={cn("d-f fd-r", className)}
      style={{ ...cssVariables, ...style }}
    >
      <StyledSwitch
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="pos-r"
      >
        <SwitchThumb />
      </StyledSwitch>
      <SwitchLabel htmlFor={switchId}>{label}</SwitchLabel>
    </SwitchContainer>
  );
};

const SwitchContainer = styled.div`
  gap: var(--padding-2);
`;

const SwitchLabel = styled.label`
  color: var(--white);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-light);
`;

const StyledSwitch = styled(Switch.Root)`
  height: var(--switch-height);
  width: var(--switch-width);
  background-color: var(--dark-gray);
  border-radius: var(--border-radius-round);

  &:hover {
    background-color: var(--medium-gray);
  }
  &[data-state="checked"] {
    background-color: var(--primary-color-faded);
    &:hover {
      background-color: var(--primary-color-light);
    }
  }
`;

const SwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: var(--switch-thumb-size);
  height: var(--switch-thumb-size);
  background-color: var(--black);
  border-radius: var(--border-radius-round);
  transition: transform var(--switch-transition-duration);
  transform: translateX(var(--switch-border-width));
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(
      calc(
        var(--switch-width) - var(--switch-thumb-size) -
          var(--switch-border-width)
      )
    );
  }
`;

export default SwitchComp;
