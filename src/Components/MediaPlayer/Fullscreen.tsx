import { Song } from "../../api/songs";
import classNames from "classnames";
import AlbumArt from "../AlbumArt";
import { useFullscreen } from "./FullscreenContext";
import FullscreenButton from "../MediaControls/FullscreenButton";
import ProgressBar from "./ProgressBar";

interface FullscreenProps {
  track: Song;
  duration: number;
  currentTime: number;
}

function Fullscreen({ track, currentTime, duration }: FullscreenProps) {
  const { isFullscreen, setIsFullscreen } = useFullscreen();

  if (!isFullscreen) {
    return null;
  }

  return (
    <div
      className={classNames(
        "fixed",
        "w-screen",
        "h-screen",
        "bg-white",
        "z-50"
      )}
    >
      <div
        className={classNames(
          "flex",
          "flex-col",
          "p-5",
          "gap-5",
          "justify-around",
          "h-screen"
        )}
      >
        <div className={classNames("flex", "flex-1", "gap-5")}>
          <div
            className={classNames(
              "w-1/4",
              "flex",
              "flex-col",
              "justify-center"
            )}
          >
            <div className={classNames("w-full")}>
              <AlbumArt id={track.coverArt} />
            </div>
          </div>
          <div
            className={classNames(
              "flex",
              "flex-col",
              "justify-center",
              "gap-4",
              "w-3/4",
              "text-center"
            )}
          >
            <h1 className={classNames("text-6xl")}>{track.title}</h1>
            <h2 className={classNames("text-3xl")}>{track.artist}</h2>
          </div>
        </div>
        <div className="flex">
          <ProgressBar length={duration} position={currentTime} />
        </div>
      </div>

      <div
        className={classNames("absolute", "left-5", "top-5", "text-gray-300")}
      >
        <FullscreenButton />
      </div>
    </div>
  );
}

export default Fullscreen;
