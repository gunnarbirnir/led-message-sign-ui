import { HUE_DEGREES } from "../constants";

export const generateHueGradient = () => {
  let gradientColors = "";
  for (let d = 0; d <= HUE_DEGREES; d++) {
    gradientColors += `, hsl(${d}deg 100% 60%)`;
  }
  return `linear-gradient(to right${gradientColors})`;
};

export const formatSignText = (text: string) => {
  return text
    .toLowerCase()
    .replaceAll("á", "a")
    .replaceAll("ð", "d")
    .replaceAll("é", "e")
    .replaceAll("í", "i")
    .replaceAll("ó", "o")
    .replaceAll("ú", "u")
    .replaceAll("ý", "y");
};
