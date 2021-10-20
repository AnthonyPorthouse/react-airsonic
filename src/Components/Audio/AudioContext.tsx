import { createContext, createRef } from "react";

const audioRef = createRef<HTMLAudioElement>();

const AudioContext = createContext(audioRef);
AudioContext.displayName = "AudioProvider";

export default AudioContext;
