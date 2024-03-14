import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";

import AudioContext from "../Audio/AudioContext.js";
import Duration from "../Duration.js";

interface ProgressBarProps {
  length: number;
  position: number;
}

function ProgressBar({ length, position }: Readonly<ProgressBarProps>) {
  const audio = useContext(AudioContext);

  const progress = (position / length) * 100;

  const progressBar = useRef<HTMLDivElement>(null);

  const trackPosition = useRef<HTMLDivElement>(null);

  const [showPosition, setShowPosition] = useState(false);
  const [mousePosX, setMousePosX] = useState(0);
  const [mousePercent, setMousePercent] = useState(0);
  const [mouseSongPos, setMouseSongPos] = useState(0);

  const [bufferPercent, setBufferPercent] = useState(0);

  useEffect(() => {
    const progressHandler = () => {
      if (!audio || !audio.buffered.length) {
        return;
      }

      let max = 0;

      for (let i = 0; i < audio.buffered.length; i++) {
        max = Math.max(max, audio.buffered.end(i));
      }

      const buffered = max;
      const duration = audio.duration;

      setBufferPercent((buffered / duration) * 100);
    };

    audio?.addEventListener("progress", progressHandler);

    return () => {
      audio?.removeEventListener("progress", progressHandler);
    };
  }, [audio, setBufferPercent]);

  const seekPosition = (e: { pageX: number }) => {
    const bar = progressBar.current;

    if (!bar || !audio) {
      console.debug(bar, audio);
      return;
    }

    const barBounding = bar.getBoundingClientRect();

    const position = e.pageX - barBounding.x;
    setMousePosX(position);

    const percentagePosition = position / barBounding.width;

    const value = length * percentagePosition;

    setMousePercent(Math.max(0, Math.min(100, percentagePosition * 100)));
    setMouseSongPos(Math.max(0, Math.min(audio.duration, value)));
  };

  const seek = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!audio) {
      return;
    }

    audio.currentTime = mouseSongPos;
  };

  const renderMousePosition = () => {
    const offset = 40;
    const rightPos = Math.min(
      (progressBar.current?.offsetWidth || offset) - offset,
      mousePosX,
    );

    const pos = Math.max(offset, rightPos);

    return (
      <div
        className={`absolute h-full bg-green-200`}
        style={{ width: `${mousePercent}%` }}
      >
        <div
          className={`w-6 h-6 absolute -right-3 -top-1 leading-none rounded-full border-4 border-green-400 bg-white`}
        />
        <div
          ref={trackPosition}
          style={{ left: `${pos}px` }}
          className={`absolute left-0 w-12 -mt-[2em] -ml-6 flex justify-center items-center`}
        >
          <div
            className={`px-2 py-1 leading-none shadow rounded bg-white text-black`}
          >
            <Duration time={mouseSongPos} />
          </div>
        </div>
      </div>
    );
  };

  const renderBasicProgressBar = () => {
    return (
      <progress
        max={100}
        value={progress}
        aria-description="Current Track Progress"
        className={`absolute h-full w-full [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-green-200`}
      />
    );
  };

  return (
    <div
      ref={progressBar}
      className={`bg-gray-200 h-4 w-full inline-block relative`}
      onMouseEnter={() => setShowPosition(true)}
      onMouseLeave={() => setShowPosition(false)}
      onMouseMove={seekPosition}
      onClick={seek}
      onKeyDown={(e) => {
        if (!audio) {
          return;
        }

        if (e.key === "ArrowRight") {
          audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        }

        if (e.key === "ArrowLeft") {
          audio.currentTime = Math.max(0, audio.currentTime - 10);
        }
      }}
      tabIndex={0}
    >
      <progress
        aria-description="Current Track Buffered Amount"
        className="h-full w-full [&::-webkit-progress-bar]:bg-transparent absolute [&::-webkit-progress-value]:bg-gray-100"
        max={100}
        value={bufferPercent}
      />

      {showPosition ? renderMousePosition() : renderBasicProgressBar()}
    </div>
  );
}

export default ProgressBar;
