import { createContext, useContext } from "react";

interface Fullscreen {
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
}

export const FullscreenContext = createContext<Fullscreen>({
  isFullscreen: false,
  setIsFullscreen: () => {},
});

export function useFullscreen() {
  return useContext<Fullscreen>(FullscreenContext);
}
