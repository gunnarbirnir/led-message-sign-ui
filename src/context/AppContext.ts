import { createContext } from "react";

import { SignConfig } from "../reducers/signConfigReducer";

interface AppContextProps extends SignConfig {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setSignText: (text: string) => void;
  setColorHue: (hue: number) => void;
  setAnimationSpeed: (speed: number) => void;
}

const AppContext = createContext<AppContextProps>({
  menuOpen: false,
  signText: "",
  colorHue: 0,
  animationSpeed: 0,
  setMenuOpen: () => null,
  setSignText: () => null,
  setColorHue: () => null,
  setAnimationSpeed: () => null,
});

export default AppContext;
