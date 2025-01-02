export const SIGN_DEFAULT_WIDTH = 1000;
export const MOBILE_WIDTH = 800;
export const MENU_TRANSITION_DURATION = 200;
export const HUE_DEGREES = 360;
export const S_TO_MS = 1000;

export const MIN_COLOR_HUE = 0;
export const MAX_COLOR_HUE = HUE_DEGREES;
export const MIN_ON_BULB_LIGHTNESS = 70;
export const MAX_ON_BULB_LIGHTNESS = 100;
export const MIN_OFF_BULB_LIGHTNESS = 0;
export const MAX_OFF_BULB_LIGHTNESS = 30;
export const MIN_FRAME_LIGHTNESS = 10;
export const MAX_FRAME_LIGHTNESS = 40;
export const MIN_BACKGROUND_LIGHTNESS = 0;
export const MAX_BACKGROUND_LIGHTNESS = 30;
export const MIN_SPEED = 1;
export const MAX_SPEED = 60;
export const MIN_HEIGHT = 60;
export const MAX_HEIGHT = 250;
export const MIN_STATIC_MODE_DELAY = 1;
export const MAX_STATIC_MODE_DELAY = 10;

export const INIT_SIGN_CONFIG = {
  signText: "",
  colorHue: 0,
  onBulbLightness: 95,
  offBulbLightness: 10,
  frameLightness: 15,
  backgroundLightness: 0,
  animationSpeed: 55,
  signHeight: 150,
  fullWidth: false,
  hideFrame: false,
  coloredOffLights: true,
  staticMode: false,
  staticModeDelay: 2,
};

export const MEDIA_QUERY = {
  SIGN_WIDTH: `${SIGN_DEFAULT_WIDTH}px`,
  MOBILE: "800px",
  SMALL_MOBILE: "600px",
};

export const URL_PARAM_KEYS: Record<string, string> = {
  signText: "text",
  colorHue: "color",
  onBulbLightness: "on-lightness",
  offBulbLightness: "off-lightness",
  frameLightness: "frame-lightness",
  backgroundLightness: "background-lightness",
  animationSpeed: "speed",
  signHeight: "height",
  fullWidth: "full-width",
  hideFrame: "hide-frame",
  coloredOffLights: "colored-off-lights",
  staticMode: "static-mode",
  staticModeDelay: "static-mode-delay",
};
