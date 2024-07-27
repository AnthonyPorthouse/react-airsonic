import type { Playlist as ApiPlaylist } from "@api/types.js";
import { Link } from "@tanstack/react-router";

import HoverableAlbumArt from "./HoverableAlbumArt.js";

interface PlaylistProps {
  playlist: ApiPlaylist;
}

function Playlist({ playlist }: Readonly<PlaylistProps>) {
  const { id, name, coverArt } = playlist;

  return (
    <Link to={`/playlists/$playlistId`} params={{ playlistId: id }}>
      <HoverableAlbumArt coverArt={coverArt} artDescription={name}>
        <h1>{name}</h1>
      </HoverableAlbumArt>
    </Link>
  );
}

export default Playlist;
