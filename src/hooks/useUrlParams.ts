import { useCallback, useEffect } from "react";

import { SignConfigUpdate } from "../reducers/signConfigReducer";
import {
  INIT_SIGN_CONFIG,
  URL_PARAM_KEYS,
  MIN_COLOR_HUE,
  MAX_COLOR_HUE,
  MIN_SPEED,
  MAX_SPEED,
  MIN_HEIGHT,
  MAX_HEIGHT,
} from "../constants";
import { sanitizeMinMaxValue } from "../utils";

type SignConfigKey = keyof SignConfigUpdate;

const DEFAULT_SIGN_TEXT = "LED Message Sign";

const sanitizeParamVal: Record<string, (val: any) => any> = {
  colorHue: sanitizeMinMaxValue(MIN_COLOR_HUE, MAX_COLOR_HUE),
  animationSpeed: sanitizeMinMaxValue(MIN_SPEED, MAX_SPEED),
  signHeight: sanitizeMinMaxValue(MIN_HEIGHT, MAX_HEIGHT),
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
