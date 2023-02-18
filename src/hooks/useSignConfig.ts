import { useReducer, useCallback, useMemo } from "react";
import { debounce } from "debounce";

import signConfigReducer, {
  SignConfigActionType,
  SignConfigUpdate,
} from "../reducers/signConfigReducer";
import { INIT_SIGN_CONFIG } from "../constants";
import useUrlParams from "./useUrlParams";

const INIT_STATE = { ...INIT_SIGN_CONFIG, input: INIT_SIGN_CONFIG };

const useSignConfig = () => {
  const [state, dispatch] = useReducer(signConfigReducer, INIT_STATE);

  const initConfig = useCallback((config: SignConfigUpdate) => {
    dispatch({
      type: SignConfigActionType.UPDATE_CONFIG_AND_INPUT,
      payload: config,
    });
  }, []);

  const updateUrlParams = useUrlParams(initConfig);

  const debouncedUpdateConfig = useMemo(
    () =>
      debounce((config: SignConfigUpdate) => {
        dispatch({
          type: SignConfigActionType.UPDATE_SIGN_CONFIG,
          payload: config,
        });
        updateUrlParams(config);
      }, 500),
    [updateUrlParams]
  );

  const updateSignConfig = useCallback(
    (config: SignConfigUpdate) => {
      dispatch({
        type: SignConfigActionType.UPDATE_CONFIG_AND_INPUT,
        payload: config,
      });
      updateUrlParams(config);
    },
    [updateUrlParams]
  );

  const updateSignConfigDebounced = useCallback(
    (config: SignConfigUpdate) => {
      dispatch({
        type: SignConfigActionType.UPDATE_CONFIG_INPUT,
        payload: config,
      });
      debouncedUpdateConfig(config);
    },
    [debouncedUpdateConfig]
  );

  const resetSignConfig = useCallback(() => {
    dispatch({
      type: SignConfigActionType.UPDATE_CONFIG_AND_INPUT,
      payload: INIT_SIGN_CONFIG,
    });
    updateUrlParams(INIT_SIGN_CONFIG);
  }, [updateUrlParams]);

  return {
    ...state,
    updateSignConfig,
    updateSignConfigDebounced,
    resetSignConfig,
  };
};

export default useSignConfig;
