import { useContext, useRef, useState } from "react";
import Duration from "./Duration";
import AudioContext from "./AudioContext";

function ProgressBar({ length, position }) {
  const audio = useContext(AudioContext);

  const progress = (position / length) * 100;

  const progressBar = useRef(null);

  const [showPosition, showPositionEnabled] = useState(false);
  const [mousePercent, setMousePercent] = useState(0);
  const [mouseSongPos, setMouseSongPos] = useState(0);

  const seek = (e) => {
    e.preventDefault();
    audio.currentTime = mouseSongPos;
  };

  return (
    <div
      ref={progressBar}
      className={`bg-gray-200 h-4 w-full inline-block`}
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
      {showPosition ? (
        <div
          className={`h-full bg-green-200 relative`}
          style={{ width: `${mousePercent}%` }}
          onClick={(e) => {
            e.preventDefault();
            // TODO: Jump to song position
          }}
        >
          <div className={`absolute right-0 -mr-4 -mt-4 leading-none`}>
            <Duration time={mouseSongPos} />
          </div>
        </div>
      ) : (
        <div
          className={`h-full bg-green-200`}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
}

export default ProgressBar;
