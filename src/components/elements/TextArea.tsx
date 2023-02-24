import React, {
  useMemo,
  CSSProperties,
  forwardRef,
  useCallback,
  ChangeEvent,
} from "react";
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
        } as CSSProperties),
      [height]
    );

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
      },
      [onChange]
    );

    return (
      <StyledTextArea
        ref={ref}
        value={value}
        spellCheck="false"
        className="w-100"
        style={cssVariables}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={handleChange}
      />
    );
  }
);

const StyledTextArea = styled.textarea`
  height: var(--text-area-height);
  border-radius: var(--border-radius);
  background-color: var(--black);
  border: var(--border-width) solid var(--dark-gray);
  color: var(--white);
  resize: none;
  padding: var(--padding-1) var(--padding-2);

  &:focus {
    border-color: var(--primary-color-faded);
  }
  &::selection {
    color: var(--black);
    background: var(--primary-color-light);
  }
`;

export default TextArea;
