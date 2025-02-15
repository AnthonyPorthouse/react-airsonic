import { useAudioRef } from "@/hooks/useAudio.js";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

import Duration from "../Duration.js";

interface ProgressBarProps {
  length: number;
  position: number;
}

function ProgressBar({ length, position }: Readonly<ProgressBarProps>) {
  const audioRef = useAudioRef();

  const progress = (position / length) * 100;

  const progressBar = useRef<HTMLDivElement>(null);

  const trackPosition = useRef<HTMLDivElement>(null);

  const [showPosition, setShowPosition] = useState(false);
  const [mousePosX, setMousePosX] = useState(0);
  const [mousePercent, setMousePercent] = useState(0);
  const [mouseSongPos, setMouseSongPos] = useState(0);

  const [bufferPercent, setBufferPercent] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

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

    if (!bar || !audioRef.current) {
      return;
    }

    const barBounding = bar.getBoundingClientRect();

    const position = e.pageX - barBounding.x;
    setMousePosX(position);

    const percentagePosition = position / barBounding.width;

    const value = length * percentagePosition;

    setMousePercent(Math.max(0, Math.min(100, percentagePosition * 100)));
    setMouseSongPos(
      Math.max(0, Math.min(audioRef.current.duration || 0, value)),
    );
  };

  const seek = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!audioRef.current) {
      return;
    }

    // eslint-disable-next-line react-compiler/react-compiler
    audioRef.current.currentTime = mouseSongPos;
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
          className={`absolute -top-1 -right-3 h-6 w-6 rounded-full border-4 border-green-400 bg-white leading-none`}
        />
        <div
          ref={trackPosition}
          style={{ left: `${pos}px` }}
          className={`absolute left-0 -mt-[2em] -ml-6 flex w-12 items-center justify-center`}
        >
          <div
            className={`rounded-sm bg-white px-2 py-1 leading-none text-black shadow-sm`}
          >
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
      role="progressbar"
      aria-valuenow={progress}
      className={`relative inline-block h-4 w-full bg-gray-200`}
      onMouseEnter={() => setShowPosition(true)}
      onMouseLeave={() => setShowPosition(false)}
      onMouseMove={seekPosition}
      onClick={seek}
      onKeyDown={(e) => {
        if (!audioRef.current) {
          return;
        }

        if (e.key === "ArrowRight") {
          audioRef.current.currentTime = Math.min(
            audioRef.current.duration,
            audioRef.current.currentTime + 10,
          );
        }

        if (e.key === "ArrowLeft") {
          audioRef.current.currentTime = Math.max(
            0,
            audioRef.current.currentTime - 10,
          );
        }
      }}
      tabIndex={0}
    >
      <div
        className={`absolute h-full bg-gray-100`}
        style={{ width: `${bufferPercent}%` }}
      />

      {showPosition ? renderMousePosition() : renderBasicProgressBar()}
    </div>
  );
}

export default ProgressBar;
