import AudioContext from "./AudioContext";

function AudioProvider({ value, children }) {
  return (
    <AudioContext.Provider value={value} displayName={"AudioProvider"}>
      {children}
    </AudioContext.Provider>
  );
}

export default AudioProvider;
