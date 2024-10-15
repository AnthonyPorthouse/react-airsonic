import type { Song } from "@api/types.js";
import { useFullscreen } from "@hooks/useFullscreen.js";
import classNames from "classnames";
import { createPortal } from "react-dom";
import { AutoFocusInside } from "react-focus-lock";

import AlbumArt from "../AlbumArt.js";
import FullscreenButton from "../MediaControls/FullscreenButton.js";
import { ProgressBarWithTime } from "./ProgressBarWithTime.js";

interface FullscreenProps {
  track: Song;
  duration: number;
  currentTime: number;
}

function Fullscreen({ track, currentTime, duration }: FullscreenProps) {
  const { isFullscreen } = useFullscreen();

  if (!isFullscreen) {
    return null;
  }

  return createPortal(
    <div
      className={classNames(
        "fixed",
        "w-dvw",
        "h-dvh",
        "bg-white",
        "z-50",
        "top-0",
      )}
    >
      <div className="absolute top-0 flex h-dvh w-dvw items-center justify-center">
        <AlbumArt
          id={track.coverArt}
          className={classNames("h-dvh w-dvw object-cover")}
        />
      </div>
      <AutoFocusInside>
        <div
          className={classNames(
            "relative",
            "flex",
            "flex-col",
            "gap-5",
            "justify-around",
            "h-screen",
            "backdrop-filter",
            "backdrop-blur-lg",
          )}
        >
          <div className={classNames("m-5", "flex", "flex-1", "gap-5")}>
            <div
              className={classNames(
                "w-1/4",
                "flex",
                "flex-col",
                "justify-center",
              )}
            >
              <div className={classNames("w-full")}>
                <AlbumArt id={track.coverArt} className="shadow-lg" />
              </div>
            </div>
            <div
              className={classNames(
                "flex",
                "flex-col",
                "justify-center",
                "gap-4",
                "w-3/4",
                "text-center",
                "text-white",
              )}
            >
              <h1
                className={classNames(
                  "text-6xl",
                  "drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]",
                )}
              >
                {track.title}
              </h1>
              <h2
                className={classNames(
                  "text-3xl",
                  "drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]",
                )}
              >
                {track.artist}
              </h2>
            </div>
          </div>
          <div className="flex bg-black bg-opacity-20 p-5">
            <ProgressBarWithTime
              length={duration}
              position={currentTime}
              className={`text-2xl text-white`}
            />
          </div>
        </div>

        <div
          className={classNames(
            "absolute",
            "left-5",
            "top-5",
            "text-white",
            "drop-shadow",
          )}
        >
          <FullscreenButton />
        </div>
      </AutoFocusInside>
    </div>,
    document.body,
  );
}

export default Fullscreen;
