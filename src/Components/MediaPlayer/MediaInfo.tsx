import TrackInfo from "../TrackInfo";
import MediaControls from "../MediaControls";
import ProgressBar from "./ProgressBar";
import Duration from "../Duration";

interface MediaInfoProps {
  trackId: string;
  duration: number;
  currentTime: number;
}

function MediaInfo({ trackId, duration, currentTime }: MediaInfoProps) {
  return (
    <div className={`flex-grow flex flex-col gap-y-3`}>
      <div className={`flex items-center justify-items-stretch`}>
        <div className={`flex-grow`}>
          <TrackInfo trackId={trackId} />
        </div>
        <div className={`flex-shrink-0`}>
          <MediaControls />
        </div>
      </div>
      <div className={`w-full flex flex-col`}>
        <ProgressBar length={duration} position={currentTime} />
        <div className={`flex justify-between`}>
          <Duration time={currentTime} />
          <Duration time={duration} />
        </div>
      </div>
    </div>
  );
}

export default MediaInfo;
