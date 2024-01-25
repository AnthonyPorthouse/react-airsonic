import { Link } from "react-router-dom";

import { Artist } from "../api/artists.js";
import HoverableAlbumArt from "./HoverableAlbumArt.js";

interface ArtistItemProps {
  artist: Artist;
}

function ArtistItem({ artist }: Readonly<ArtistItemProps>) {
  const { id, name, coverArt } = artist;

  return (
    <Link to={`/artists/${id}`}>
      <HoverableAlbumArt coverArt={coverArt} artDescription={name}>
        <h1>{name}</h1>
      </HoverableAlbumArt>
    </Link>
  );
}

export default ArtistItem;
