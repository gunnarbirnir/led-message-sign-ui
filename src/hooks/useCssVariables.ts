import { useMemo, CSSProperties } from "react";

import { MENU_TRANSITION_DURATION } from "../constants";

const useCssVariables = (colorHue: number) => {
  const cssVariables = useMemo(
    () =>
      ({
        "--black": "hsl(0deg 0% 0%)",
        "--white": "hsl(0deg 0% 100%)",
        "--light-gray": "hsl(0deg 0% 60%)",
        "--medium-gray": "hsl(0deg 0% 30%)",
        "--dark-gray": "hsl(0deg 0% 20%)",
        "--background-color": "hsl(0deg 0% 3%)",
        "--color-hue": `${colorHue}deg`,
        "--primary-color-light": `hsl(${colorHue}deg 100% 70%)`,
        "--primary-color-faded": `hsl(${colorHue}deg 50% 50%)`,
        "--primary-color-saturated": `hsl(${colorHue}deg 100% 60%)`,
        "--main-content-min-height": "300px",
        "--border-width": "2px",
        "--border-radius": "5px",
        "--border-radius-round": "1000px",
        "--menu-transition-duration": `${MENU_TRANSITION_DURATION}ms`,
        "--menu-transition-timing-function": "ease-out",
        "--padding-1": "5px",
        "--padding-2": "10px",
        "--padding-3": "20px",
        "--padding-4": "40px",
        "--font-size-sm": "12px",
        "--font-size-md": "14px",
        "--font-size-lg": "15px",
        "--font-weight-light": "500",
        "--font-weight-medium": "600",
        "--box-shadow-normal": "0 2px 10px 2px hsl(0deg 0% 0% / 0.8)",
        "--box-shadow-solid": "0 0 0 5px hsl(0deg 0% 0% / 0.5)",
        "--icon-button-size": "40px",
      } as CSSProperties),
    [colorHue]
  );

  return cssVariables;
};

export default useCssVariables;
