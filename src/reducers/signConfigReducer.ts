export interface SignConfig {
  signText: string;
  colorHue: number;
  animationSpeed: number;
  signHeight: number;
  fullWidth: boolean;
  hideFrame: boolean;
  coloredOffLights: boolean;
}

export type SignConfigUpdate = Partial<SignConfig>;

interface SignConfigState extends SignConfig {
  input: SignConfig;
  initialized: boolean;
}

export enum SignConfigActionType {
  INIT_SIGN_CONFIG = "INIT_SIGN_CONFIG",
  UPDATE_SIGN_CONFIG = "UPDATE_SIGN_CONFIG",
  UPDATE_CONFIG_INPUT = "UPDATE_CONFIG_INPUT",
  UPDATE_CONFIG_AND_INPUT = "UPDATE_CONFIG_AND_INPUT",
}

interface InitSignConfigAction {
  type: SignConfigActionType.INIT_SIGN_CONFIG;
  payload: SignConfigUpdate;
}

interface UpdateSignConfigAction {
  type: SignConfigActionType.UPDATE_SIGN_CONFIG;
  payload: SignConfigUpdate;
}

interface UpdateConfigInputAction {
  type: SignConfigActionType.UPDATE_CONFIG_INPUT;
  payload: SignConfigUpdate;
}

interface UpdateConfigAndInputAction {
  type: SignConfigActionType.UPDATE_CONFIG_AND_INPUT;
  payload: SignConfigUpdate;
}

type SignConfigAction =
  | InitSignConfigAction
  | UpdateSignConfigAction
  | UpdateConfigInputAction
  | UpdateConfigAndInputAction;

const signConfigReducer = (
  state: SignConfigState,
  action: SignConfigAction
) => {
  const { type, payload } = action;

  switch (type) {
    case SignConfigActionType.INIT_SIGN_CONFIG:
      return {
        ...state,
        ...payload,
        initialized: true,
        input: {
          ...state.input,
          ...payload,
        },
      };
    case SignConfigActionType.UPDATE_SIGN_CONFIG:
      return {
        ...state,
        ...payload,
        input: {
          ...state.input,
        },
      };
    case SignConfigActionType.UPDATE_CONFIG_INPUT:
      return {
        ...state,
        input: {
          ...state.input,
          ...payload,
        },
      };
    case SignConfigActionType.UPDATE_CONFIG_AND_INPUT:
      return {
        ...state,
        ...payload,
        input: {
          ...state.input,
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default signConfigReducer;
