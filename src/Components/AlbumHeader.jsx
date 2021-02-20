import AlbumArt from "./AlbumArt";
import { useDispatch } from "react-redux";
import { getNextTrack, setTracks } from "../features/playlistSlice";

function AlbumHeader({ album }) {
  const dispatch = useDispatch();

  const playAll = (e) => {
    e.preventDefault();
    dispatch(setTracks(album.tracks));
    dispatch(getNextTrack());
  };

  return (
    <div className={`flex flex-col gap-6 w-64`}>
      <AlbumArt id={album.coverArt} description={album.name} />
      <div>
        <h1 className={`text-3xl`}>{album.name}</h1>
        <h2 className={`text-xl`}>{album.artist}</h2>
        <h3>{album.year}</h3>
      </div>

      <button onClick={playAll}>Play All</button>
    </div>
  );
}

export default AlbumHeader;
