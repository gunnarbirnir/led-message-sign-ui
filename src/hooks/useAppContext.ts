import { useContext } from "react";

import { AppContext } from "../context";

const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};

export default useAppContext;
