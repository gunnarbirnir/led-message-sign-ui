export const SIGN_DEFAULT_WIDTH = 1000;
export const MOBILE_WIDTH = 800;
export const MENU_TRANSITION_DURATION = 200;
export const HUE_DEGREES = 360;
export const SPEED_TO_FPU = [0, 30, 20, 15, 10, 8, 6, 4, 3, 2, 1];

export const MIN_COLOR_HUE = 0;
export const MAX_COLOR_HUE = HUE_DEGREES;
export const MIN_SPEED = 1;
export const MAX_SPEED = 10;
export const MIN_HEIGHT = 50;
export const MAX_HEIGHT = 250;

export const INIT_SIGN_CONFIG = {
  signText: "",
  colorHue: 0,
  animationSpeed: 8,
  signHeight: 150,
  fullWidth: false,
  hideFrame: false,
  coloredOffLights: true,
};

export const MEDIA_QUERY = {
  SIGN_WIDTH: `${SIGN_DEFAULT_WIDTH}px`,
  MOBILE: "800px",
  SMALL_MOBILE: "600px",
};

export const URL_PARAM_KEYS: Record<string, string> = {
  signText: "text",
  colorHue: "color",
  animationSpeed: "speed",
  signHeight: "height",
  fullWidth: "full-width",
  hideFrame: "hide-frame",
  coloredOffLights: "colored-off-lights",
};
