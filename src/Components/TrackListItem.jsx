import { ReactComponent as Play } from "../images/play.svg";
import { ReactComponent as NowPlaying } from "../images/play-active.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getNextTrack,
  selectCurrentTrack,
  setTracks,
} from "../features/playlistSlice";
import Duration from "./Duration";
import { useContext } from "react";
import AlbumContext from "./AlbumContext";

function TrackListItem({ track }) {
  const dispatch = useDispatch();
  const tracks = useContext(AlbumContext);

  const currentTrackId = useSelector(selectCurrentTrack);

  const play = (e) => {
    e.preventDefault();

    const startingIndex = tracks.findIndex((t) => t.id === track.id);

    dispatch(setTracks(tracks.slice(startingIndex).map((t) => t.id)));
    dispatch(getNextTrack());
  };

  const playButton = (
    <button
      onClick={play}
      className={`flex gap-6 md:block w-full md:w-6 flex-shrink-0`}
      title={`Play Track`}
    >
      <Play className={`flex-shrink-0 w-6 md:w-full`} />
      <span className={`truncate md:hidden`}>{track.title}</span>
    </button>
  );

  const nowPlaying = (
    <div
      className={`flex gap-6 md:block w-full md:w-6 flex-shrink-0`}
      title={`Currently Playing`}
    >
      <NowPlaying
        className={`flex-shrink-0 w-6 md:w-full stroke-current text-green-400`}
      />
      <span className={`truncate md:hidden`}>{track.title}</span>
    </div>
  );

  return (
    <div className={`flex gap-6 overflow-hidden`}>
      {currentTrackId === track.id ? nowPlaying : playButton}
      <div className={`flex-grow gap-6 hidden md:flex`}>
        <span className={`w-1/12 text-right`}>
          {track.discNumber ? `${track.discNumber} / ` : null}
          {` ${track.track} `}
        </span>
        <span className={`w-1/6 truncate`}>{track.artist}</span>
        <span className={`flex-grow w-0 truncate`}>{track.title}</span>
        <span className={`text-right`}>
          <Duration time={track.duration} />
        </span>
      </div>
    </div>
  );
}

export default TrackListItem;
