import { HUE_DEGREES } from "../constants";

export const generateHueGradient = () => {
  let gradientColors = "";
  for (let d = 0; d <= HUE_DEGREES; d++) {
    gradientColors += `, hsl(${d}deg 100% 60%)`;
  }
  return `linear-gradient(to right${gradientColors})`;
};
