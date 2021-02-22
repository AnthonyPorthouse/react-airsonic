import { ReactComponent as Play } from "../images/play.svg";
import { useDispatch } from "react-redux";
import { getNextTrack, setTracks } from "../features/playlistSlice";
import Duration from "./Duration";
import { useContext } from "react";
import AlbumContext from "./AlbumContext";

function TrackListItem({ track }) {
  const dispatch = useDispatch();
  const tracks = useContext(AlbumContext);

  const play = (e) => {
    e.preventDefault();

    const startingIndex = tracks.findIndex((t) => t.id === track.id);

    dispatch(setTracks(tracks.slice(startingIndex).map((t) => t.id)));
    dispatch(getNextTrack());
  };

  return (
    <div className={`flex gap-6 overflow-hidden`}>
      <button
        onClick={play}
        className={`flex gap-6 md:block w-full md:w-6 flex-shrink-0`}
        title={`Play Track`}
      >
        <Play className={`flex-shrink-0 w-6 md:w-full`} />
        <span className={`truncate md:hidden`}>{track.title}</span>
      </button>
      <div className={`flex-grow gap-6 hidden md:flex`}>
        <span className={`w-1/12 text-right`}>
          {track.discNumber ? `${track.discNumber} / ` : null}
          {` ${track.track} `}
        </span>
        <span className={`w-1/6 truncate`}>{track.artist}</span>
        <span className={`flex-grow w-0 truncate`}>{track.title}</span>
        <span className={`w-1/12 text-right`}>
          <Duration time={track.duration} />
        </span>
      </div>
    </div>
  );
}

export default TrackListItem;
