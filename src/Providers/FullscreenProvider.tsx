import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Fullscreen {
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
}

export const FullscreenContext = createContext<Fullscreen>({
  isFullscreen: false,
  setIsFullscreen: () => {},
});

export default function FullscreenProvider({
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

export function useFullscreen() {
  return useContext<Fullscreen>(FullscreenContext);
}
