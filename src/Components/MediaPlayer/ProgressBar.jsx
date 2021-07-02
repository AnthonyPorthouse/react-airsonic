import { useContext, useEffect, useRef, useState } from "react";
import Duration from "../Duration";
import AudioContext from "../Audio/AudioContext";

function ProgressBar({ length, position }) {
  const audio = useContext(AudioContext);

  const progress = (position / length) * 100;

  const progressBar = useRef(null);

  const [showPosition, showPositionEnabled] = useState(false);
  const [mousePercent, setMousePercent] = useState(0);
  const [mouseSongPos, setMouseSongPos] = useState(0);

  const [bufferPercent, setBufferPercent] = useState(0);

  useEffect(() => {
    const progressHandler = (e) => {
      if (!audio.buffered?.length) {
        return;
      }
      const buffered = audio.buffered.end(audio.buffered.length - 1);
      const duration = audio.duration;

      setBufferPercent((buffered / duration) * 100);
    };

    audio.addEventListener("progress", progressHandler);

    return () => {
      audio.removeEventListener("progress", progressHandler);
    };
  });

  const seekPosition = (e) => {
    const bar = progressBar.current;
    const barBounding = bar.getBoundingClientRect();

    const position = e.pageX - barBounding.x;

    const percentagePosition = position / barBounding.width;

    const value = length * percentagePosition;

    setMousePercent(Math.max(0, Math.min(100, percentagePosition * 100)));
    setMouseSongPos(Math.max(0, Math.min(audio.duration, value)));
  };

  const seek = (e) => {
    e.preventDefault();
    audio.currentTime = mouseSongPos;
  };

  return (
    <div
      ref={progressBar}
      className={`bg-gray-200 h-4 w-full inline-block relative`}
      onMouseEnter={() => showPositionEnabled(true)}
      onMouseLeave={() => showPositionEnabled(false)}
      onMouseMove={seekPosition}
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
          <div
            className={`w-6 h-6 absolute -right-3 -top-1 leading-none rounded-full border-4 border-green-400 bg-white`}
          />
          <div
            className={`absolute right-0 w-12 -mt-8 -mr-6 flex items-center`}
          >
            <div className={`px-2 py-1 leading-none shadow rounded bg-white`}>
              <Duration time={mouseSongPos} />
            </div>
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
