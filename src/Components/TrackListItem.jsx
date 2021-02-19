import { ReactComponent as Play } from "../images/play.svg";
import { useDispatch } from "react-redux";
import { getNextTrack, setTracks } from "../features/playlistSlice";
import Duration from "./Duration";

function TrackListItem({ track }) {
  const dispatch = useDispatch();

  const play = (e) => {
    e.preventDefault();
    dispatch(setTracks([track.id]));
    dispatch(getNextTrack());
  };

  return (
    <div className={`flex gap-6`}>
      <button
        onClick={play}
        className={`inline-block w-6`}
        title={`Play Track`}
      >
        <Play className={`w-full`} />
      </button>
      <div className={`flex-grow flex gap-6`}>
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
