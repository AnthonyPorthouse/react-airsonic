import type { Artist } from "@api/types.js";
import { Link } from "@tanstack/react-router";

import HoverableAlbumArt from "./HoverableAlbumArt.js";

interface ArtistItemProps {
  artist: Artist;
}

function ArtistItem({ artist }: Readonly<ArtistItemProps>) {
  const { id, name, coverArt } = artist;

  return (
    <Link to={`/artists/$artistId`} params={{ artistId: id }}>
      <HoverableAlbumArt coverArt={coverArt} artDescription={name}>
        <h1>{name}</h1>
      </HoverableAlbumArt>
    </Link>
  );
}

export default ArtistItem;
