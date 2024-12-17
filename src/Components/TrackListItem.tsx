import type { Song } from "@api/types.js";
import { useAlbumTracks } from "@hooks/useAlbumTracks.js";
import { useTrackList } from "@hooks/useTrackList.js";
import { Play, Plus } from "lucide-react";
import { SyntheticEvent, memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

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

  const tracks = useAlbumTracks();

  const { getCurrentTrack, setTrackList, addTrack } = useTrackList();

  const play = (e: SyntheticEvent) => {
    e.preventDefault();

    const startingIndex = tracks.findIndex((t) => t.id === track.id);
    setTrackList(tracks.slice(startingIndex));
  };

  const add = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      addTrack(track);
    },
    [addTrack, track],
  );

  const playButton = (
    <button
      onClick={play}
      className={`w-6 flex-shrink-0`}
      aria-label={t("playTrack")}
    >
      <a
        data-tooltip-id="tooltip"
        data-tooltip-content={t("playTrack")}
        data-tooltip-delay-show={1000}
      >
        <Play className={`w-6 fill-black md:w-full`} />
      </a>
    </button>
  );

  const addButton = useMemo(
    () => (
      <button
        onClick={add}
        className={`w-6 flex-shrink-0`}
        aria-label={t("addTrack")}
      >
        <a
          data-tooltip-id="tooltip"
          data-tooltip-content={t("addTrack")}
          data-tooltip-delay-show={1000}
        >
          <Plus className={`w-6 md:w-full`} />
        </a>
      </button>
    ),
    [add, t],
  );

  const nowPlayingIcon = (
    <div className={`w-6 flex-shrink-0`} aria-label={t("currentlyPlaying")}>
      <a
        data-tooltip-id="tooltip"
        data-tooltip-content={t("currentlyPlaying")}
        data-tooltip-delay-show={1000}
      >
        <Play className={`w-6 fill-green-400 text-green-400 md:w-full`} />
      </a>
    </div>
  );

  return (
    <div className={`flex gap-6 overflow-hidden`}>
      <div className="flex w-full flex-shrink-0 flex-row gap-6 md:block md:w-6">
        <div className="flex flex-row">
          {getCurrentTrack()?.id === track.id ? nowPlayingIcon : playButton}
          {includeAdd && addButton}
        </div>
        <span className={`truncate md:hidden`}>{track.title}</span>
      </div>

      <span className={`hidden w-1/12 text-right tabular-nums md:block`}>
        {track.discNumber ? `${track.discNumber} / ` : null}
        {track.track}
      </span>
      <span className={`hidden w-1/6 truncate md:block`}>{track.artist}</span>
      <span className={`hidden w-0 flex-grow truncate md:block`}>
        {track.title}
      </span>
      <span className={`hidden text-right md:block`}>
        <Duration time={track.duration} />
      </span>
    </div>
  );
}

export default memo(TrackListItem);
