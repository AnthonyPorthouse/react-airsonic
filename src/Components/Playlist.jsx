import React from "react";
import AlbumArt from "./AlbumArt";
import { Link } from "react-router-dom";

function Playlist({ playlist }) {
  const { id, name, coverArt } = playlist;

  return (
    <Link to={`/playlists/${id}`} className={`block`}>
      <AlbumArt id={coverArt} description={name} />
      <h1>{name}</h1>
    </Link>
  );
}

export default Playlist;
