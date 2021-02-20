import { useContext, useEffect, useRef, useState } from "react";
import Duration from "./Duration";
import AudioContext from "./AudioContext";

function ProgressBar({ length, position }) {
  const audio = useContext(AudioContext);

  const progress = (position / length) * 100;

  const progressBar = useRef(null);

  const [showPosition, showPositionEnabled] = useState(false);
  const [mousePercent, setMousePercent] = useState(0);
  const [mouseSongPos, setMouseSongPos] = useState(0);

  const [bufferPercent, setBufferPercent] = useState(0);

  useEffect(() => {
    audio.addEventListener("progress", (e) => {
      if (!audio.buffered?.length) {
        return;
      }
      const buffered = audio.buffered.end(audio.buffered.length - 1);
      const duration = audio.duration;

      setBufferPercent((buffered / duration) * 100);
    });
  });

  const seek = (e) => {
    e.preventDefault();
    audio.currentTime = mouseSongPos;
  };

  return (
    <div
      ref={progressBar}
      className={`bg-gray-200 h-4 w-full inline-block relative`}
      onMouseEnter={(e) => showPositionEnabled(true)}
      onMouseLeave={(e) => showPositionEnabled(false)}
      onMouseMove={(e) => {
        const bar = progressBar.current;
        const barBounding = bar.getBoundingClientRect();

        const position = e.pageX - barBounding.x;

        const percentagePosition = position / barBounding.width;

        const value = length * percentagePosition;
        setMousePercent(percentagePosition * 100);
        setMouseSongPos(value);
      }}
      onClick={seek}
    >
      <div
        className={`h-full bg-gray-100 absolute`}
        style={{ width: `${bufferPercent}%` }}
      />

      {showPosition ? (
        <div
          className={`absolute h-full bg-green-200`}
          style={{ width: `${mousePercent}%` }}
        >
          <div className={`absolute right-0 -mr-4 -mt-4 leading-none`}>
            <Duration time={mouseSongPos} />
          </div>
        </div>
      ) : (
        <div
          className={`absolute h-full bg-green-200`}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
}

export default ProgressBar;
