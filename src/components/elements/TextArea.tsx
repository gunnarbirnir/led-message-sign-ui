import React, { useMemo, CSSProperties, forwardRef } from "react";
import styled from "styled-components";

interface TextAreaProps {
  value: string;
  height?: number;
  maxLength?: number;
  placeholder?: string;
  onChange: (val: string) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, height = 100, maxLength, placeholder, onChange }, ref) => {
    const cssVariables = useMemo(
      () =>
        ({
          "--text-area-height": `${height}px`,
          "--text-area-focus-saturation": "50%",
          "--text-area-focus-lightness": "50%",
          "--text-area-selection-saturation": "100%",
          "--text-area-selection-lightness": "70%",
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
        placeholder={placeholder}
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
  padding: var(--padding-1) var(--padding-2);

  &:focus {
    border-color: hsl(
      var(--color-hue) var(--text-area-focus-saturation)
        var(--text-area-focus-lightness)
    );
  }
  &::selection {
    color: var(--black);
    background: hsl(
      var(--color-hue) var(--text-area-selection-saturation)
        var(--text-area-selection-lightness)
    );
  }
`;

export default TextArea;
