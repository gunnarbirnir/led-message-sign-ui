import { useEffect, useRef } from "react";

import { MENU_TRANSITION_DURATION } from "../constants";

const useFocusSignTextArea = (menuOpen: boolean) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    let focusTimeout: NodeJS.Timeout | null = null;
    const clearFocusTimeout = () => {
      if (focusTimeout) {
        clearTimeout(focusTimeout);
      }
    };

    if (menuOpen) {
      clearFocusTimeout();
      focusTimeout = setTimeout(() => {
        if (textAreaRef?.current) {
          const tempVal = textAreaRef.current.value;
          textAreaRef.current.value = "";
          textAreaRef.current.focus();
          // To place cursor at end of text
          textAreaRef.current.value = tempVal;
        }
      }, MENU_TRANSITION_DURATION);
    }

    return clearFocusTimeout;
  }, [menuOpen]);

  return textAreaRef;
};

export default useFocusSignTextArea;
