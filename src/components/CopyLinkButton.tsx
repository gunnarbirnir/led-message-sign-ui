import React, { FC, useCallback, useState, useMemo, useEffect } from "react";

import { Button } from "./elements";

const CopyLinkButton: FC = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const buttonText = useMemo(
    () => (buttonClicked ? "Link copied" : "Copy Link"),
    [buttonClicked]
  );

  const handleCopyLink = useCallback(() => {
    // TODO: Clean up params?
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

  return <Button onClick={handleCopyLink}>{buttonText}</Button>;
};

export default CopyLinkButton;
