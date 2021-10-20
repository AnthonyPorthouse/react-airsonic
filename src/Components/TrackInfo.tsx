import { getSongById } from "../app/features/songSlice";
import { useAppSelector } from "../app/hooks";

interface TrackInfoProps {
  trackId: string;
}

function TrackInfo({ trackId }: TrackInfoProps) {
  const song = useAppSelector((state) => getSongById(state, trackId));

  if (!song) {
    return null;
  }

  return (
    <div className={`grid text-left w-full`}>
      <span className={`font-bold truncate`}>{song.title}</span>
      <span className={`truncate`}>{song.artist}</span>
    </div>
  );
}

export default TrackInfo;
