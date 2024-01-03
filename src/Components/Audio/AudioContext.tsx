import { createContext, createRef } from "react";

const audioRef = createRef<HTMLAudioElement>();

const AudioContext = createContext(audioRef.current);

export default AudioContext;
