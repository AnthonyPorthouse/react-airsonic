import TrackInfo from "../TrackInfo";
import MediaControls from "../MediaControls";
import { Song } from "../../api/songs";
import { ProgressBarWithTime } from "./ProgressBarWithTime";

interface MediaInfoProps {
  track: Song;
  duration: number;
  currentTime: number;
}

function MediaInfo({ track, duration, currentTime }: MediaInfoProps) {
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
