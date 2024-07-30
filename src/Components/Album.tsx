import type { Album as ApiAlbum } from "@api/types.js";
import { Link } from "@tanstack/react-router";

import HoverableAlbumArt from "./HoverableAlbumArt.js";

interface AlbumProps {
  album: ApiAlbum;
  lazyLoad?: boolean;
}

function Album({ album, lazyLoad }: Readonly<AlbumProps>) {
  const { id, name, artist, coverArt } = album;

  return (
    <Link
      to={`/albums/$albumId`}
      params={{ albumId: id }}
      className={`group relative block w-full focus:ring-0`}
    >
      <HoverableAlbumArt
        coverArt={coverArt}
        artDescription={name}
        lazyLoad={lazyLoad}
      >
        <h1 className={`text-xl`}>{name}</h1>
        <h2>{artist}</h2>
      </HoverableAlbumArt>
    </Link>
  );
}

export default Album;
