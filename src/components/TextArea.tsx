import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  value: string;
  colorHue: number;
  onChange: (val: string) => void;
}

const TextArea: FC<IProps> = ({ value, colorHue, onChange }) => {
  return (
    <StyledTextArea
      value={value}
      colorHue={colorHue}
      spellCheck="false"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const StyledTextArea = styled.textarea<{ colorHue: number }>`
  height: 150px;
  width: 100%;
  resize: none;
  outline: 0;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: hsl(0deg 0% 0%);
  border: 2px solid hsl(0deg 0% 20%);
  color: hsl(0deg 0% 100%);

  &:focus {
    border-color: ${({ colorHue }) => `hsl(${colorHue}deg 80% 60%)`};
  }

  &::selection {
    color: hsl(0deg 0% 0%);
    background: ${({ colorHue }) => `hsl(${colorHue}deg 100% 60%)`};
  }
`;

export default TextArea;
