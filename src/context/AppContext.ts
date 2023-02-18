import { createContext } from "react";

import { SignConfig } from "../reducers/signConfigReducer";

interface AppContextProps extends SignConfig {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  resetSignConfig: () => void;
  setSignText: (text: string) => void;
  setColorHue: (hue: number) => void;
  setAnimationSpeed: (speed: number) => void;
  setSignHeight: (height: number) => void;
  setFullWidth: (fullWidth: boolean) => void;
  setHideFrame: (hideFrame: boolean) => void;
  setColoredOffLights: (coloredOffLights: boolean) => void;
}

const AppContext = createContext<AppContextProps>({
  menuOpen: false,
  signText: "",
  colorHue: 0,
  animationSpeed: 0,
  signHeight: 0,
  fullWidth: false,
  hideFrame: false,
  coloredOffLights: false,
  setMenuOpen: () => null,
  resetSignConfig: () => null,
  setSignText: () => null,
  setColorHue: () => null,
  setAnimationSpeed: () => null,
  setSignHeight: () => null,
  setFullWidth: () => null,
  setHideFrame: () => null,
  setColoredOffLights: () => null,
});

export default AppContext;
