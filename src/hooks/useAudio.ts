import { AudioContext } from "@/Contexts/AudioContext";
import { useContext, useState } from "react";

export function useAudioRef() {
  return useContext(AudioContext);
}

export function useAudioState() {
  const audioRef = useAudioRef();

  const [isPaused, setIsPaused] = useState(false);

  audioRef.current?.addEventListener("pause", () => {
    console.log("Pausing");
    setIsPaused(true);
  });

  audioRef.current?.addEventListener("play", () => {
    console.log("Playing");
    setIsPaused(false);
  });

  return {
    isPaused,
  };
}
