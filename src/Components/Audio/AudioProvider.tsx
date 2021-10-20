import AudioContext from "./AudioContext";
import { ReactNode } from "react";

interface AudioProviderProps {
  value: any;
  children: ReactNode;
}

function AudioProvider({ value, children }: AudioProviderProps) {
  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export default AudioProvider;
