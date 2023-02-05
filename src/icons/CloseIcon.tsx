import React, { FC, SVGProps } from "react";

const CloseIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 530.1 530.1"
    xmlSpace="preserve"
    {...props}
  >
    <path
      d="M185.3 265 0 80.5 80.5 0 265 185.3 450.3 0l79.8 80.5L344.8 265l185.3 185.3-79.8 79.8L265 344.8 80.5 530.1 0 450.3 185.3 265z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
      }}
    />
  </svg>
);

export default CloseIcon;
