import { useMemo } from "react";

import { SignConfig, SignConfigUpdate } from "../reducers/signConfigReducer";

const useAppContextValue = ({
  input,
  menuOpen,
  setMenuOpen,
  updateSignConfig,
  updateSignConfigDebounced,
  resetSignConfig,
}: {
  input: SignConfig;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  updateSignConfigDebounced: (config: SignConfigUpdate) => void;
  updateSignConfig: (config: SignConfigUpdate) => void;
  resetSignConfig: () => void;
}) => {
  const contextValue = useMemo(
    () => ({
      menuOpen,
      ...input,
      setMenuOpen,
      resetSignConfig,
      setSignText: (signText: string) =>
        updateSignConfigDebounced({ signText }),
      setColorHue: (colorHue: number) =>
        updateSignConfigDebounced({ colorHue }),
      setOnBulbLightness: (onBulbLightness: number) =>
        updateSignConfigDebounced({ onBulbLightness }),
      setOffBulbLightness: (offBulbLightness: number) =>
        updateSignConfigDebounced({ offBulbLightness }),
      setFrameLightness: (frameLightness: number) =>
        updateSignConfigDebounced({ frameLightness }),
      setBackgroundLightness: (backgroundLightness: number) =>
        updateSignConfigDebounced({ backgroundLightness }),
      setAnimationSpeed: (animationSpeed: number) =>
        updateSignConfigDebounced({ animationSpeed }),
      setSignHeight: (signHeight: number) =>
        updateSignConfigDebounced({ signHeight }),
      setFullWidth: (fullWidth: boolean) => updateSignConfig({ fullWidth }),
      setHideFrame: (hideFrame: boolean) => updateSignConfig({ hideFrame }),
      setColoredOffLights: (coloredOffLights: boolean) =>
        updateSignConfig({ coloredOffLights }),
      setStaticMode: (staticMode: boolean) => updateSignConfig({ staticMode }),
      setStaticModeDelay: (staticModeDelay: number) =>
        updateSignConfigDebounced({ staticModeDelay }),
    }),
    [
      menuOpen,
      input,
      setMenuOpen,
      updateSignConfig,
      updateSignConfigDebounced,
      resetSignConfig,
    ]
  );

  return contextValue;
};

export default useAppContextValue;
