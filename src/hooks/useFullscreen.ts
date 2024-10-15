import { Fullscreen, FullscreenContext } from "@/Contexts/FullscreenContext";
import { useContext } from "react";

export function useFullscreen() {
  return useContext<Fullscreen>(FullscreenContext);
}
