import React, { useMemo, CSSProperties, forwardRef } from "react";
import styled from "styled-components";

interface TextAreaProps {
  value: string;
  height?: number;
  maxLength?: number;
  onChange: (val: string) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, height = 100, maxLength, onChange }, ref) => {
    const cssVariables = useMemo(
      () =>
        ({
          "--text-area-height": `${height}px`,
          "--text-area-focus-lightness": "60%",
          "--text-area-selection-lightness": "60%",
        } as CSSProperties),
      [height]
    );

    return (
      <StyledTextArea
        value={value}
        ref={ref}
        spellCheck="false"
        style={cssVariables}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
);

const StyledTextArea = styled.textarea`
  height: var(--text-area-height);
  width: 100%;
  border-radius: var(--border-radius);
  background-color: var(--black);
  border: var(--border-width) solid var(--border-color);
  color: var(--white);
  resize: none;
  padding: 5px 10px;

  &:focus {
    border-color: hsl(var(--color-hue) 100% var(--text-area-focus-lightness));
  }
  &::selection {
    color: var(--black);
    background: hsl(var(--color-hue) 100% var(--text-area-selection-lightness));
  }
`;

export default TextArea;
