import AlbumArt from "./AlbumArt";
import { Link } from "react-router-dom";
import { Playlist as ApiPlaylist } from "../api/playlists";

interface PlaylistProps {
  playlist: ApiPlaylist;
}

function Playlist({ playlist }: PlaylistProps) {
  const { id, name, coverArt } = playlist;

  return (
    <Link to={`/playlists/${id}`} className={`block`}>
      <AlbumArt id={coverArt} description={name} />
      <h1>{name}</h1>
    </Link>
  );
}

export default Playlist;