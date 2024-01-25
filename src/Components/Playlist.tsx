import { Link } from "react-router-dom";

import { Playlist as ApiPlaylist } from "../api/playlists.js";
import HoverableAlbumArt from "./HoverableAlbumArt.js";

interface PlaylistProps {
  playlist: ApiPlaylist;
}

function Playlist({ playlist }: Readonly<PlaylistProps>) {
  const { id, name, coverArt } = playlist;

  return (
    <Link to={`/playlists/${id}`}>
      <HoverableAlbumArt coverArt={coverArt} artDescription={name}>
        <h1>{name}</h1>
      </HoverableAlbumArt>
    </Link>
  );
}

export default Playlist;
