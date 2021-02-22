import { createContext, createRef } from "react";

const audioRef = createRef();
audioRef.current = new Audio();

const AudioContext = createContext(audioRef);

export default AudioContext;
