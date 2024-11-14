import { AudioContext } from "@/Contexts/AudioContext";
import { useContext } from "react";

export function useAudio() {
  return useContext(AudioContext);
}

export function useAudioState() {
  const audio = useAudio();

  return {
    isPaused: audio?.paused ?? false,
  };
}
