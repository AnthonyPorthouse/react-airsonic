import { Song } from "../api/songs";

interface TrackInfoProps {
  track: Song;
}

function TrackInfo({ track }: TrackInfoProps) {
  if (!track) {
    return null;
  }

  return (
    <div className={`grid text-left w-full`}>
      <span className={`font-bold truncate`}>{track.title}</span>
      <span className={`truncate`}>{track.artist}</span>
    </div>
  );
}

export default TrackInfo;