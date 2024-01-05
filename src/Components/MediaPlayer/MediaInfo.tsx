import { Song } from "../../api/songs.js";
import TrackInfo from "../TrackInfo.js";
import MediaControls from "./MediaControls.js";
import { ProgressBarWithTime } from "./ProgressBarWithTime.js";

interface MediaInfoProps {
  track: Song;
  duration: number;
  currentTime: number;
}

function MediaInfo({ track, duration, currentTime }: Readonly<MediaInfoProps>) {
  return (
    <div className={`flex-grow flex flex-col gap-y-3`}>
      <div className={`flex items-center justify-items-stretch`}>
        <div className={`flex-grow`}>
          <TrackInfo track={track} />
        </div>
        <div className={`flex-shrink-0`}>
          <MediaControls />
        </div>
      </div>
      <ProgressBarWithTime length={duration} position={currentTime} />
    </div>
  );
}

export default MediaInfo;
