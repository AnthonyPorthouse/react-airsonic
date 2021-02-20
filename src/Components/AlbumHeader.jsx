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
    <section className={`flex flex-col gap-6`}>
      <div className={`grid grid-cols-2 lg:grid-cols-1 gap-6 w-full lg:w-64`}>
        <AlbumArt id={album.coverArt} description={album.name} />
        <div>
          <h1 className={`text-2xl lg:text-3xl`}>{album.name}</h1>
          <h2 className={`text-xl`}>{album.artist}</h2>
          <h3>{album.year}</h3>
          <button className={`w-full`} onClick={playAll}>
            Play All
          </button>
        </div>
      </div>
    </section>
  );
}

export default AlbumHeader;
