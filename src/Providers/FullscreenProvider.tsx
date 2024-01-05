import { ReactNode, useEffect, useState } from "react";

import { FullscreenContext } from "../Components/MediaPlayer/FullscreenContext.js";

export default function FullscreenProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setFullscreen = async (enableFullscreen: boolean) => {
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
  };

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement !== null);
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const fullscreenValue = {
    isFullscreen,
    setIsFullscreen: setFullscreen,
  };

  return (
    <FullscreenContext.Provider value={fullscreenValue}>
      {children}
    </FullscreenContext.Provider>
  );
}
