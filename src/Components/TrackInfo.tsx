import type { Song } from "@api/types.js";
import { Link } from "@tanstack/react-router";

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
      {track.artistId ? (
        <Link to="/artists/$artistId" params={{ artistId: track.artistId }}>
          <span className={`truncate`}>{track.artist}</span>
        </Link>
      ) : (
        <span className={`truncate`}>{track.artist}</span>
      )}
    </div>
  );
}

export default TrackInfo;
