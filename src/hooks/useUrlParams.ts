import { useCallback, useEffect } from "react";

import { SignConfigUpdate } from "../reducers/signConfigReducer";
import {
  INIT_SIGN_CONFIG,
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

const URL_PARAMS: Record<
  string,
  {
    key: string;
    sanitizeVal?: (val: any) => any;
  }
> = {
  signText: { key: "text" },
  colorHue: {
    key: "color",
    sanitizeVal: sanitizeMinMaxValue(MIN_COLOR_HUE, MAX_COLOR_HUE),
  },
  animationSpeed: {
    key: "speed",
    sanitizeVal: sanitizeMinMaxValue(MIN_SPEED, MAX_SPEED),
  },
  signHeight: {
    key: "height",
    sanitizeVal: sanitizeMinMaxValue(MIN_HEIGHT, MAX_HEIGHT),
  },
  fullWidth: { key: "full-width" },
  hideFrame: { key: "hide-frame" },
  coloredOffLights: { key: "colored-off-lights" },
};

// TODO: Remove unused params when copying link
// TODO: Write tests

const useUrlParams = (initConfig: (config: SignConfigUpdate) => void) => {
  useEffect(() => {
    const paramValues: Record<string, unknown> = {};
    const urlParams = new URLSearchParams(window.location.search);

    Object.keys(URL_PARAMS).forEach((confKey) => {
      const paramKey = URL_PARAMS[confKey].key;
      const paramVal = urlParams.get(paramKey);
      const confType = typeof INIT_SIGN_CONFIG[confKey as SignConfigKey];
      const sanitizeParamVal = URL_PARAMS[confKey].sanitizeVal;
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

        paramValues[confKey] = sanitizeParamVal
          ? sanitizeParamVal(parsedParamVal)
          : parsedParamVal;
      }
    });

    initConfig({ signText: DEFAULT_SIGN_TEXT, ...paramValues });
  }, [initConfig]);

  const updateUrlParams = useCallback((config: SignConfigUpdate) => {
    const url = new URL(window.location.href);

    Object.keys(URL_PARAMS).forEach((confKey) => {
      const paramKey = URL_PARAMS[confKey].key;
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
