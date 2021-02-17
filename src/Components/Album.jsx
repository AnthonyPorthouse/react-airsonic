import AlbumArt from "./AlbumArt";
import { Link } from "react-router-dom";

function Album({ album }) {
  const { id, name, year, coverArt } = album;

  return (
    <Link to={`/albums/${id}`} className={`block w-64`}>
      <AlbumArt id={coverArt} description={name} />
      <h1>
        {name} ({year})
      </h1>
    </Link>
  );
}

export default Album;
