import AlbumArt from "./AlbumArt";
import { Link } from "react-router-dom";
import { Album as ApiAlbum } from "../app/features/api";

interface AlbumProps {
  album: ApiAlbum;
}

function Album({ album }: AlbumProps) {
  const { id, name, artist, coverArt } = album;

  return (
    <Link
      to={`/albums/${id}`}
      className={`block w-full relative rounded overflow-hidden hover:shadow-lg`}
    >
      <AlbumArt id={coverArt} description={name} />
      <div
        className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ease-in-out bg-white/75 opacity-0 hover:opacity-100 p-1 flex flex-col justify-center text-center`}
      >
        <h1 className={`text-xl`}>{name}</h1>
        <h2>{artist}</h2>
      </div>
    </Link>
  );
}

export default Album;
