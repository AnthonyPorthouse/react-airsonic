import AlbumArt from "./AlbumArt";
import { useDispatch } from "react-redux";
import { getNextTrack, setTracks } from "../app/features/playlistSlice";

function AlbumHeader({ album }) {
  const dispatch = useDispatch();

  const playAll = (e) => {
    e.preventDefault();
    dispatch(setTracks(album.tracks));
    dispatch(getNextTrack());
  };

  const shuffleAll = (e) => {
    e.preventDefault();

    let tracks = album.tracks.slice();

    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    };

    dispatch(setTracks(shuffle(tracks)));
    dispatch(getNextTrack());
  };

  return (
    <section className={`flex flex-col gap-6`}>
      <div className={`grid grid-cols-3 lg:grid-cols-1 gap-6 w-full lg:w-64`}>
        <AlbumArt id={album.coverArt} description={album.name} />
        <div className={`col-span-2 lg:col-span-1`}>
          <h1 className={`text-2xl lg:text-3xl`}>{album.name}</h1>
          <h2 className={`text-xl`}>{album.artist}</h2>
          <h3>{album.year}</h3>
          <button className={`w-full`} onClick={playAll}>
            Play All
          </button>
          <button className={`w-full`} onClick={shuffleAll}>
            Shuffle All
          </button>
        </div>
      </div>
    </section>
  );
}

export default AlbumHeader;
