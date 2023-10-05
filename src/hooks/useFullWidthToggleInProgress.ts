import { useEffect, useLayoutEffect, useState } from "react";

const useFullWidthToggleInProgress = (fullWidth: boolean) => {
  const [toggleInProgress, setToggleInProgress] = useState(false);

  useLayoutEffect(() => {
    if (fullWidth) {
      setToggleInProgress(true);
    }
  }, [fullWidth]);

  useEffect(() => {
    if (toggleInProgress) {
      setToggleInProgress(false);
    }
  }, [toggleInProgress]);

  return toggleInProgress;
};

export default useFullWidthToggleInProgress;
