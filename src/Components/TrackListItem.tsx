import { ReactComponent as Play } from "../images/play.svg";
import { ReactComponent as NowPlaying } from "../images/play-active.svg";
import Duration from "./Duration";
import { SyntheticEvent, useContext } from "react";
import AlbumContext from "./AlbumContext";
import { useTranslation } from "react-i18next";
import { Song } from "../api/songs";
import { useTrackList } from "../hooks";

interface TrackListItemProps {
  track: Song;
}

function TrackListItem({ track }: TrackListItemProps) {
  const { t } = useTranslation("media");

  const tracks = useContext(AlbumContext);

  const { currentTrack, setTrackList } = useTrackList();

  const play = (e: SyntheticEvent) => {
    e.preventDefault();

    const startingIndex = tracks.findIndex((t) => t.id === track.id);
    setTrackList(tracks.slice(startingIndex));
  };

  const playButton = (
    <button
      onClick={play}
      className={`flex gap-6 md:block w-full md:w-6 flex-shrink-0`}
      title={t("playTrack")}
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
      {Number(currentTrack) === Number(track.id) ? nowPlaying : playButton}
      <div className={`flex-grow gap-6 hidden md:flex`}>
        <span className={`w-1/12 text-right`}>
          {track.discNumber ? `${track.discNumber} / ` : null}
          {track.track ? track.track : null}
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
