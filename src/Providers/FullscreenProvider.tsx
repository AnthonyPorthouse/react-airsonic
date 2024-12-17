import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { FullscreenContext } from "../Contexts/FullscreenContext";

export function FullscreenProvider({ children }: Readonly<PropsWithChildren>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setFullscreen = useCallback(async (enableFullscreen: boolean) => {
    try {
      if (enableFullscreen) {
        await document.body.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.error(e);
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

export default FullscreenProvider;
