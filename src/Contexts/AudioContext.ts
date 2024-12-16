import { createContext, createRef } from "react";

const audioRef = createRef<HTMLAudioElement>();
export const AudioContext = createContext(audioRef);
