import { createContext } from "react";

export interface Fullscreen {
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
}

export const FullscreenContext = createContext<Fullscreen>({
  isFullscreen: false,
  setIsFullscreen: () => {},
});
