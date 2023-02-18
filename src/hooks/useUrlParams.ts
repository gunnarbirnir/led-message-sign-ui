import { useCallback, useEffect } from "react";

import { SignConfigUpdate } from "../reducers/signConfigReducer";
import { INIT_SIGN_CONFIG } from "../constants";

type SignConfigKey = keyof SignConfigUpdate;

const DEFAULT_SIGN_TEXT = "LED Message Sign";

const URL_PARAMS: Record<string, string> = {
  signText: "text",
  colorHue: "hue",
};

const useUrlParams = (initConfig: (config: SignConfigUpdate) => void) => {
  useEffect(() => {
    const paramValues: Record<string, unknown> = {};
    const urlParams = new URLSearchParams(window.location.search);

    Object.keys(URL_PARAMS).forEach((confKey) => {
      const paramKey = URL_PARAMS[confKey];
      const paramVal = urlParams.get(paramKey);
      const confType = typeof INIT_SIGN_CONFIG[confKey as SignConfigKey];
      let parsedParamVal: unknown = paramVal;

      if (paramVal) {
        if (confType === "string") {
          parsedParamVal = decodeURIComponent(paramVal);
        } else if (confType === "number") {
          const paramNum = parseInt(paramVal);
          parsedParamVal = isNaN(paramNum) ? 0 : paramVal;
        }
        paramValues[confKey] = parsedParamVal;
      }
    });

    initConfig({ signText: DEFAULT_SIGN_TEXT, ...paramValues });
  }, [initConfig]);

  const updateUrlParams = useCallback((config: SignConfigUpdate) => {
    const url = new URL(window.location.href);

    Object.keys(URL_PARAMS).forEach((confKey) => {
      const paramKey = URL_PARAMS[confKey];
      const confValue = config[confKey as SignConfigKey];
      const initConfVal = INIT_SIGN_CONFIG[confKey as SignConfigKey];
      let formattedVal = "";

      if (confValue !== undefined) {
        if (confValue !== initConfVal) {
          if (typeof confValue === "string") {
            formattedVal = encodeURIComponent(confValue.toLowerCase());
          } else if (typeof confValue === "number") {
            formattedVal = confValue.toString();
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
