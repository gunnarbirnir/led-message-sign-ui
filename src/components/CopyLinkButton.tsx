import React, { FC, useCallback, useState, useMemo, useEffect } from "react";

import { Button } from "./elements";

interface CopyLinkButtonProps {
  variant?: "filled" | "outlined";
}

const CopyLinkButton: FC<CopyLinkButtonProps> = ({ variant }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const buttonText = useMemo(
    () => (buttonClicked ? "Link copied" : "Copy Link"),
    [buttonClicked]
  );

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
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
