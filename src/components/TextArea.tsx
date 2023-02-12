import React, { FC, useRef, useEffect, useMemo, CSSProperties } from "react";
import styled from "styled-components";

interface IProps {
  value: string;
  menuOpen: boolean;
  onChange: (val: string) => void;
}

const TextArea: FC<IProps> = ({ value, menuOpen, onChange }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const cssVariables = useMemo(
    () =>
      ({
        "--text-area-height": "150px",
      } as CSSProperties),
    []
  );

  useEffect(() => {
    let focusTimeout: NodeJS.Timeout | null = null;
    const clearFocusTimeout = () => {
      if (focusTimeout) {
        clearTimeout(focusTimeout);
      }
    };

    if (menuOpen) {
      clearFocusTimeout();
      focusTimeout = setTimeout(() => {
        if (textAreaRef?.current) {
          const tempVal = textAreaRef.current.value;
          textAreaRef.current.value = "";
          textAreaRef.current.focus();
          // To place cursor at end of text
          textAreaRef.current.value = tempVal;
        }
      }, 200);
    }

    return clearFocusTimeout;
  }, [menuOpen]);

  return (
    <StyledTextArea
      value={value}
      ref={textAreaRef}
      spellCheck="false"
      style={cssVariables}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const StyledTextArea = styled.textarea`
  height: var(--text-area-height);
  width: 100%;
  border-radius: var(--border-radius);
  background-color: var(--black);
  border: var(--border-width) solid var(--border-color);
  color: var(--white);

  &:focus {
    border-color: hsl(var(--color-hue) 80% 60%);
  }

  &::selection {
    color: var(--black);
    background: hsl(var(--color-hue) 100% 60%);
  }
`;

export default TextArea;
