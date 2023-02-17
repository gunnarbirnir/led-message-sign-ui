import { useReducer, useCallback, useMemo, useEffect } from "react";
import { debounce } from "debounce";

import signConfigReducer, {
  SignConfigActionType,
  SignConfigUpdate,
} from "../reducers/signConfigReducer";

const initialSignConfig = {
  signText: "",
  colorHue: 0,
};

const initialState = {
  ...initialSignConfig,
  input: initialSignConfig,
};

const useSignConfig = () => {
  const [state, dispatch] = useReducer(signConfigReducer, initialState);

  useEffect(() => {
    // TODO: Get initial values from URL
  }, []);

  const updatePageURL = useCallback((config: SignConfigUpdate) => {
    // TODO
  }, []);

  const debouncedUpdate = useMemo(
    () =>
      debounce((config: SignConfigUpdate) => {
        dispatch({
          type: SignConfigActionType.UPDATE_SIGN_CONFIG,
          payload: config,
        });
        updatePageURL(config);
      }, 500),
    [updatePageURL]
  );

  const updateSignConfig = useCallback(
    (config: SignConfigUpdate) => {
      dispatch({
        type: SignConfigActionType.UPDATE_CONFIG_AND_INPUT,
        payload: config,
      });
      updatePageURL(config);
    },
    [updatePageURL]
  );

  const updateSignConfigDebounced = useCallback(
    (config: SignConfigUpdate) => {
      dispatch({
        type: SignConfigActionType.UPDATE_CONFIG_INPUT,
        payload: config,
      });
      debouncedUpdate(config);
    },
    [debouncedUpdate]
  );

  return { ...state, updateSignConfig, updateSignConfigDebounced };
};

export default useSignConfig;

// const DEFAULT_TEXT = "Click the settings icon to configure sign";

// useEffect(() => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const textParam = urlParams.get("text");
//   const hueParam = urlParams.get("hue");
//   const hueNum = parseInt(hueParam || "0");
//   const initText = textParam ? decodeURIComponent(textParam) : DEFAULT_TEXT;
//   const hue = isNaN(hueNum) ? 0 : hueNum;

//   setSignText(initText);
//   setTextInput(initText);
//   setColorHue(hue);
//   setHueInput(hue);
// }, []);

// const updateSignText = useMemo(
//   () =>
//     debounce((text: string) => {
//       setSignText(text);
//       const url = new URL(window.location.href);
//       if (text) {
//         url.searchParams.set("text", encodeURIComponent(text.toLowerCase()));
//       } else {
//         url.searchParams.delete("text");
//       }
//       window.history.replaceState({}, "", url);
//     }, 500),
//   []
// );

// const updateColorHue = useMemo(
//   () =>
//     debounce((hue: number) => {
//       setColorHue(hue);
//       const url = new URL(window.location.href);
//       if (hue) {
//         url.searchParams.set("hue", hue.toString());
//       } else {
//         url.searchParams.delete("hue");
//       }
//       window.history.replaceState({}, "", url);
//     }, 500),
//   []
// );
