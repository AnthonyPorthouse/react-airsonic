import { Link } from "react-router-dom";

import { Album as ApiAlbum } from "../api/albums.js";
import AlbumArt from "./AlbumArt.js";

interface AlbumProps {
  album: ApiAlbum;
  lazyLoad?: boolean;
}

function Album({ album, lazyLoad }: Readonly<AlbumProps>) {
  const { id, name, artist, coverArt } = album;

  return (
    <Link to={`/albums/${id}`} className={`group block w-full relative focus:ring-0`}>
      <div className="group-focus:-translate-y-2 group-hover:-translate-y-2 group-focus:shadow-lg group-hover:shadow-lg overflow-hidden rounded transition group-focus:ring-inset">
        <AlbumArt id={coverArt} description={name} lazyLoad={lazyLoad} />
        <div
          className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ease-in-out bg-white/75 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 flex flex-col justify-center text-center`}
        >
          <h1 className={`text-xl`}>{name}</h1>
          <h2>{artist}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Album;
