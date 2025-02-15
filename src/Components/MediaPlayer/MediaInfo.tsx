import type { Song } from "@api/types.js";

import TrackInfo from "../TrackInfo.js";
import MediaControls from "./MediaControls.js";
import { ProgressBarWithTime } from "./ProgressBarWithTime.js";

interface MediaInfoProps {
  track: Song;
  duration: number;
  currentTime: number;
  state: "playing" | "paused" | "stopped";
}

function MediaInfo({
  track,
  duration,
  currentTime,
  state,
}: Readonly<MediaInfoProps>) {
  return (
    <div className={`flex grow flex-col gap-y-3`}>
      <div className={`flex items-center justify-items-stretch`}>
        <div className={`grow`}>
          <TrackInfo track={track} />
        </div>
        <div className={`shrink-0`}>
          <MediaControls state={state} />
        </div>
      </div>
      <ProgressBarWithTime length={duration} position={currentTime} />
    </div>
  );
}

export default MediaInfo;
