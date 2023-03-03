import React, { FC, useCallback, useState, useMemo, useEffect } from "react";

import { Button } from "./elements";
import { URL_PARAM_KEYS } from "../constants";

interface CopyLinkButtonProps {
  variant?: "filled" | "outlined";
}

const PARAM_KEYS = Object.values(URL_PARAM_KEYS);

const CopyLinkButton: FC<CopyLinkButtonProps> = ({ variant }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const buttonText = useMemo(
    () => (buttonClicked ? "Link copied" : "Copy Link"),
    [buttonClicked]
  );

  const handleCopyLink = useCallback(() => {
    const url = new URL(window.location.href);

    url.searchParams.forEach((_val, param) => {
      if (!PARAM_KEYS.includes(param)) {
        url.searchParams.delete(param);
      }
    });

    navigator.clipboard.writeText(url.href);
    window.history.replaceState({}, "", url);
    setButtonClicked(true);
  }, []);

  useEffect(() => {
    let buttonTimeout: NodeJS.Timeout | null = null;

    if (buttonClicked) {
      buttonTimeout = setTimeout(() => {
        setButtonClicked(false);
      }, 2000);
    }

    return () => {
      if (buttonTimeout) {
        clearTimeout(buttonTimeout);
      }
    };
  }, [buttonClicked]);

  return (
    <Button onClick={handleCopyLink} variant={variant}>
      {buttonText}
    </Button>
  );
};

export default CopyLinkButton;
