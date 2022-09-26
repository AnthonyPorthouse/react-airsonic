import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";

import AudioContext from "../Audio/AudioContext";
import Duration from "../Duration";

interface ProgressBarProps {
  length: number;
  position: number;
}

function ProgressBar({ length, position }: ProgressBarProps) {
  const audio = useContext(AudioContext);

  const progress = (position / length) * 100;

  const progressBar = useRef<HTMLDivElement>(null);

  const trackPosition = useRef<HTMLDivElement>(null);

  const [showPosition, showPositionEnabled] = useState(false);
  const [mousePosX, setMousePosX] = useState(0);
  const [mousePercent, setMousePercent] = useState(0);
  const [mouseSongPos, setMouseSongPos] = useState(0);

  const [bufferPercent, setBufferPercent] = useState(0);

  useEffect(() => {
    const progressHandler = () => {
      if (!audio?.buffered.length) {
        return;
      }
      const buffered = audio.buffered.end(audio.buffered.length - 1);
      const duration = audio.duration;

      setBufferPercent((buffered / duration) * 100);
    };

    audio?.addEventListener("progress", progressHandler);

    return () => {
      audio?.removeEventListener("progress", progressHandler);
    };
  });

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
      mousePosX
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
          className={`absolute left-0 w-12 -mt-8 -ml-6 flex items-center`}
        >
          <div className={`px-2 py-1 leading-none shadow rounded bg-white`}>
            <Duration time={mouseSongPos} />
          </div>
        </div>
      </div>
    );
  };

  const renderBasicProgressBar = () => {
    return (
      <div
        className={`absolute h-full bg-green-200`}
        style={{ width: `${progress}%` }}
      />
    );
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

      {showPosition ? renderMousePosition() : renderBasicProgressBar()}
    </div>
  );
}

export default ProgressBar;
