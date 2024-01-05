import React from "react";
import { Link } from "react-router-dom";

import { Artist } from "../api/artists.js";
import AlbumArt from "./AlbumArt.js";

interface ArtistItemProps {
  artist: Artist;
}

function ArtistItem({ artist }: Readonly<ArtistItemProps>) {
  const { id, name, coverArt } = artist;

  return (
    <Link to={`/artists/${id}`} className={`block`}>
      <AlbumArt id={coverArt} description={name} />
      <h1>{name}</h1>
    </Link>
  );
}

export default ArtistItem;
