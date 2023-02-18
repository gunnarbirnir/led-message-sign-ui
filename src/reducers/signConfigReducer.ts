export interface SignConfig {
  signText: string;
  colorHue: number;
  animationSpeed: number;
}

export type SignConfigUpdate = Partial<SignConfig>;

interface SignConfigState extends SignConfig {
  input: SignConfig;
}

export enum SignConfigActionType {
  UPDATE_SIGN_CONFIG = "UPDATE_SIGN_CONFIG",
  UPDATE_CONFIG_INPUT = "UPDATE_CONFIG_INPUT",
  UPDATE_CONFIG_AND_INPUT = "UPDATE_CONFIG_AND_INPUT",
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
  | UpdateSignConfigAction
  | UpdateConfigInputAction
  | UpdateConfigAndInputAction;

const signConfigReducer = (
  state: SignConfigState,
  action: SignConfigAction
) => {
  const { type, payload } = action;

  switch (type) {
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
