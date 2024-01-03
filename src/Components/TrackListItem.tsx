import { PlayIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent, useContext } from "react";
import { useTranslation } from "react-i18next";

import { useTrackList } from "../Providers/TrackListProvider.js";
import { Song } from "../api/songs.js";
import AlbumContext from "./AlbumContext.js";
import Duration from "./Duration.js";

interface TrackListItemProps {
  track: Song;
}

function TrackListItem({ track }: TrackListItemProps) {
  const { t } = useTranslation("media");

  const tracks = useContext(AlbumContext);

  const { getCurrentTrack, setTrackList } = useTrackList();

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
      <PlayIcon className={`flex-shrink-0 w-6 md:w-full`} />
      <span className={`truncate md:hidden`}>{track.title}</span>
    </button>
  );

  const nowPlaying = (
    <div
      className={`flex gap-6 md:block w-full md:w-6 flex-shrink-0`}
      title={`Currently Playing`}
    >
      <PlayIcon className={`flex-shrink-0 w-6 md:w-full text-green-400`} />
      <span className={`truncate md:hidden`}>{track.title}</span>
    </div>
  );

  return (
    <div className={`flex gap-6 overflow-hidden`}>
      {getCurrentTrack()?.id === track.id ? nowPlaying : playButton}
      <span className={`hidden md:block w-1/12 text-right`}>
        {track.discNumber ? `${track.discNumber} / ` : null}
        {track.track ? track.track : null}
      </span>
      <span className={`hidden md:block w-1/6 truncate`}>{track.artist}</span>
      <span className={`hidden md:block flex-grow w-0 truncate`}>
        {track.title}
      </span>
      <span className={`hidden md:block text-right`}>
        <Duration time={track.duration} />
      </span>
    </div>
  );
}

export default TrackListItem;
