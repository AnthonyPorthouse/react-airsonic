import React from "react";
import AlbumArt from "./AlbumArt";
import { Link } from "react-router-dom";
import { Artist } from "../features/api";

interface ArtistItemProps {
  artist: Artist;
}

function ArtistItem({ artist }: ArtistItemProps) {
  const { id, name, coverArt } = artist;

  return (
    <Link to={`/artists/${id}`} className={`block`}>
      <AlbumArt id={coverArt} description={name} />
      <h1>{name}</h1>
    </Link>
  );
}

export default ArtistItem;
