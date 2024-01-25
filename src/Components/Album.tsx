import { Link } from "react-router-dom";

import { Album as ApiAlbum } from "../api/albums.js";
import HoverableAlbumArt from "./HoverableAlbumArt.js";

interface AlbumProps {
  album: ApiAlbum;
  lazyLoad?: boolean;
}

function Album({ album, lazyLoad }: Readonly<AlbumProps>) {
  const { id, name, artist, coverArt } = album;

  return (
    <Link
      to={`/albums/${id}`}
      className={`group block w-full relative focus:ring-0`}
    >
      <HoverableAlbumArt coverArt={coverArt} artDescription={name} lazyLoad >
        <h1 className={`text-xl`}>{name}</h1>
        <h2>{artist}</h2>
      </HoverableAlbumArt>
    </Link>
  );
}

export default Album;
