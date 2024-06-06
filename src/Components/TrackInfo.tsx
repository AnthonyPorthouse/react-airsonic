import { Song } from "../api/songs.js";

interface TrackInfoProps {
  track: Song;
}

function TrackInfo({ track }: Readonly<TrackInfoProps>) {
  if (!track) {
    return null;
  }

  return (
    <div className={`grid w-full text-left`}>
      <span className={`truncate font-bold`}>{track.title}</span>
      <span className={`truncate`}>{track.artist}</span>
    </div>
  );
}

export default TrackInfo;
