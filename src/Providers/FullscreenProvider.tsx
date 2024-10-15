import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { FullscreenContext } from "../Contexts/FullscreenContext";

export function FullscreenProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setFullscreen = useCallback(async (enableFullscreen: boolean) => {
    if (enableFullscreen) {
      try {
        await document.body.requestFullscreen();
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await document.exitFullscreen();
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement !== null);
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const fullscreenValue = useMemo(() => {
    return {
      isFullscreen,
      setIsFullscreen: setFullscreen,
    };
  }, [isFullscreen, setFullscreen]);

  return (
    <FullscreenContext.Provider value={fullscreenValue}>
      {children}
    </FullscreenContext.Provider>
  );
}
