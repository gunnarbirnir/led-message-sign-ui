import { createContext } from "react";

interface AppContextProps {
  menuOpen: boolean;
  signText: string;
  colorHue: number;
  setMenuOpen: (open: boolean) => void;
  setSignText: (text: string) => void;
  setColorHue: (hue: number) => void;
}

const AppContext = createContext<AppContextProps>({
  menuOpen: false,
  signText: "",
  colorHue: 0,
  setMenuOpen: () => null,
  setSignText: () => null,
  setColorHue: () => null,
});

export default AppContext;
