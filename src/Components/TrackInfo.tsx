import { getSongById } from "../app/features/songSlice";
import { useAppSelector } from "../app/hooks";

interface TrackInfoProps {
  track: string
}

function TrackInfo({ track }: TrackInfoProps) {
  const song = useAppSelector((state) => getSongById(state, track));

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
