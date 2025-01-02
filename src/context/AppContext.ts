import { createContext } from "react";

import { SignConfig } from "../reducers/signConfigReducer";

interface AppContextProps extends SignConfig {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  resetSignConfig: () => void;
  setSignText: (text: string) => void;
  setColorHue: (hue: number) => void;
  setOnBulbLightness: (lightness: number) => void;
  setOffBulbLightness: (lightness: number) => void;
  setFrameLightness: (lightness: number) => void;
  setBackgroundLightness: (lightness: number) => void;
  setAnimationSpeed: (speed: number) => void;
  setSignHeight: (height: number) => void;
  setFullWidth: (fullWidth: boolean) => void;
  setHideFrame: (hideFrame: boolean) => void;
  setColoredOffLights: (coloredOffLights: boolean) => void;
  setStaticMode: (enabled: boolean) => void;
  setStaticModeDelay: (delay: number) => void;
}

const AppContext = createContext<AppContextProps>({
  menuOpen: false,
  signText: "",
  colorHue: 0,
  onBulbLightness: 0,
  offBulbLightness: 0,
  frameLightness: 0,
  backgroundLightness: 0,
  animationSpeed: 0,
  signHeight: 0,
  fullWidth: false,
  hideFrame: false,
  coloredOffLights: false,
  staticMode: false,
  staticModeDelay: 0,
  setMenuOpen: () => null,
  resetSignConfig: () => null,
  setSignText: () => null,
  setColorHue: () => null,
  setOnBulbLightness: () => null,
  setOffBulbLightness: () => null,
  setFrameLightness: () => null,
  setBackgroundLightness: () => null,
  setAnimationSpeed: () => null,
  setSignHeight: () => null,
  setFullWidth: () => null,
  setHideFrame: () => null,
  setColoredOffLights: () => null,
  setStaticMode: () => null,
  setStaticModeDelay: () => null,
});

export default AppContext;
