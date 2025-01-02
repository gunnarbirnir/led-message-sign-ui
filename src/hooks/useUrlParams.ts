import { useCallback, useEffect } from "react";

import { SignConfigUpdate } from "../reducers/signConfigReducer";
import {
  INIT_SIGN_CONFIG,
  URL_PARAM_KEYS,
  MIN_COLOR_HUE,
  MAX_COLOR_HUE,
  MIN_ON_BULB_LIGHTNESS,
  MAX_ON_BULB_LIGHTNESS,
  MIN_OFF_BULB_LIGHTNESS,
  MAX_OFF_BULB_LIGHTNESS,
  MIN_FRAME_LIGHTNESS,
  MAX_FRAME_LIGHTNESS,
  MIN_BACKGROUND_LIGHTNESS,
  MAX_BACKGROUND_LIGHTNESS,
  MIN_SPEED,
  MAX_SPEED,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_STATIC_MODE_DELAY,
  MAX_STATIC_MODE_DELAY,
} from "../constants";
import { sanitizeMinMaxValue } from "../utils";

type SignConfigKey = keyof SignConfigUpdate;

const DEFAULT_SIGN_TEXT = "LED Message Sign";

const sanitizeParamVal: Record<string, (val: any) => any> = {
  colorHue: sanitizeMinMaxValue(MIN_COLOR_HUE, MAX_COLOR_HUE),
  onBulbLightness: sanitizeMinMaxValue(
    MIN_ON_BULB_LIGHTNESS,
    MAX_ON_BULB_LIGHTNESS
  ),
  offBulbLightness: sanitizeMinMaxValue(
    MIN_OFF_BULB_LIGHTNESS,
    MAX_OFF_BULB_LIGHTNESS
  ),
  frameLightness: sanitizeMinMaxValue(MIN_FRAME_LIGHTNESS, MAX_FRAME_LIGHTNESS),
  backgroundLightness: sanitizeMinMaxValue(
    MIN_BACKGROUND_LIGHTNESS,
    MAX_BACKGROUND_LIGHTNESS
  ),
  animationSpeed: sanitizeMinMaxValue(MIN_SPEED, MAX_SPEED),
  signHeight: sanitizeMinMaxValue(MIN_HEIGHT, MAX_HEIGHT),
  staticModeDelay: sanitizeMinMaxValue(
    MIN_STATIC_MODE_DELAY,
    MAX_STATIC_MODE_DELAY
  ),
};

const useUrlParams = (initConfig: (config: SignConfigUpdate) => void) => {
  useEffect(() => {
    const paramValues: Record<string, unknown> = {};
    const urlParams = new URLSearchParams(window.location.search);

    Object.keys(URL_PARAM_KEYS).forEach((confKey) => {
      const paramKey = URL_PARAM_KEYS[confKey];
      const paramVal = urlParams.get(paramKey);
      const confType = typeof INIT_SIGN_CONFIG[confKey as SignConfigKey];
      const sanitizeVal = sanitizeParamVal[confKey];
      let parsedParamVal: unknown = paramVal;

      if (paramVal) {
        if (confType === "string") {
          parsedParamVal = decodeURIComponent(paramVal);
        } else if (confType === "number") {
          const paramNum = parseInt(paramVal);
          parsedParamVal = isNaN(paramNum) ? 0 : paramVal;
        } else if (confType === "boolean") {
          parsedParamVal = paramVal === "true";
        }

        paramValues[confKey] = sanitizeVal
          ? sanitizeVal(parsedParamVal)
          : parsedParamVal;
      }
    });

    initConfig({ signText: DEFAULT_SIGN_TEXT, ...paramValues });
  }, [initConfig]);

  const updateUrlParams = useCallback((config: SignConfigUpdate) => {
    const url = new URL(window.location.href);

    Object.keys(URL_PARAM_KEYS).forEach((confKey) => {
      const paramKey = URL_PARAM_KEYS[confKey];
      const confValue = config[confKey as SignConfigKey];
      const initConfVal = INIT_SIGN_CONFIG[confKey as SignConfigKey];
      let formattedVal = "";

      if (confValue !== undefined) {
        if (confValue !== initConfVal) {
          if (typeof confValue === "string") {
            formattedVal = encodeURIComponent(confValue.toLowerCase());
          } else if (typeof confValue === "number") {
            formattedVal = confValue.toString();
          } else if (typeof confValue === "boolean") {
            formattedVal = confValue ? "true" : "false";
          }
        }

        if (formattedVal) {
          url.searchParams.set(paramKey, formattedVal);
        } else {
          url.searchParams.delete(paramKey);
        }
      }
    });

    window.history.replaceState({}, "", url);
  }, []);

  return updateUrlParams;
};

export default useUrlParams;
