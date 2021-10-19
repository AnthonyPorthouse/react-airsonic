import AudioContext from "./AudioContext";
import {ReactChildren} from "react";

interface AudioProviderProps {
  value: any
  children: ReactChildren
}

function AudioProvider({ value, children }: AudioProviderProps) {
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export default AudioProvider;
