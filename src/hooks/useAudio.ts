import { AudioContext } from "@/Contexts/AudioContext";
import { useContext } from "react";

export function useAudio() {
  return useContext(AudioContext);
}
