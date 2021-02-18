import AlbumArt from "./AlbumArt";
import { Link } from "react-router-dom";

function Album({ album }) {
  const { id, name, artist, coverArt } = album;

  return (
    <Link to={`/albums/${id}`} className={`block w-64 border`}>
      <AlbumArt id={coverArt} description={name} />
      <h1 className={`text-xl`}>{name}</h1>
      <h2>{artist}</h2>
    </Link>
  );
}

export default Album;
