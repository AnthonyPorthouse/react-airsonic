import { PlayIcon, PlusIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent, useContext } from "react";
import { useTranslation } from "react-i18next";

import { useTrackList } from "../Providers/TrackListProvider.js";
import { Song } from "../api/songs.js";
import AlbumContext from "./AlbumContext.js";
import Duration from "./Duration.js";

interface TrackListItemProps {
  track: Song;
  includeAdd?: boolean;
}

function TrackListItem({
  track,
  includeAdd = false,
}: Readonly<TrackListItemProps>) {
  const { t } = useTranslation("media");

  const tracks = useContext(AlbumContext);

  const { getCurrentTrack, setTrackList, addTrack } = useTrackList();

  const play = (e: SyntheticEvent) => {
    e.preventDefault();

    const startingIndex = tracks.findIndex((t) => t.id === track.id);
    setTrackList(tracks.slice(startingIndex));
  };

  const add = (e: SyntheticEvent) => {
    e.preventDefault();

    addTrack(track);
  };

  const playButton = (
    <button onClick={play} className={`w-6 flex-shrink-0`}>
      <a
        data-tooltip-id="tooltip"
        data-tooltip-content={t("playTrack")}
        data-tooltip-delay-show={1000}
      >
        <PlayIcon className={`w-6 md:w-full`} />
      </a>
    </button>
  );

  const addButton = (
    <button onClick={add} className={`w-6 flex-shrink-0`}>
      <a
        data-tooltip-id="tooltip"
        data-tooltip-content={t("addTrack")}
        data-tooltip-delay-show={1000}
      >
        <PlusIcon className={`w-6 md:w-full`} />
      </a>
    </button>
  );

  const nowPlayingIcon = (
    <div
      className={`flex gap-6 md:block w-full md:w-6 flex-shrink-0`}
      title={t("currentlyPlaying")}
    >
      <a
        data-tooltip-id="tooltip"
        data-tooltip-content={t("currentlyPlaying")}
        data-tooltip-delay-show={1000}
      >
        <PlayIcon className={`flex-shrink-0 w-6 md:w-full text-green-400`} />
      </a>
      <span className={`truncate md:hidden`}>{track.title}</span>
    </div>
  );

  return (
    <div className={`flex gap-6 overflow-hidden`}>
      <div className="flex flex-row gap-6 md:block w-full md:w-6 flex-shrink-0">
        <div className="flex flex-row">
          {getCurrentTrack()?.id === track.id ? nowPlayingIcon : playButton}
          {includeAdd && addButton}
        </div>
        <span className={`truncate md:hidden`}>{track.title}</span>
      </div>

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
