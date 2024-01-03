import { useWindowHeight } from "@react-hook/window-size";
import classNames from "classnames";
import { CSSProperties, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FixedSizeList as List } from "react-window";

import { useTrackList } from "../Providers/TrackListProvider.js";
import { Episode } from "../api/podcasts.js";
import EpisodeListItem from "./EpisodeListItem.js";
import PodcastContext from "./PodcastContext.js";

interface EpisodeListProps {
  episodes: Episode[];
}

function EpisodeList({ episodes }: EpisodeListProps) {
  const { t } = useTranslation("podcasts");
  const windowHeight = useWindowHeight();

  const episodeListRef = useRef<HTMLDivElement>(null);
  const innerEpisodeListRef = useRef<HTMLDivElement>(null);
  const { getCurrentTrack } = useTrackList();

  const mediaBarOffset = 124;
  const rowHeight = 40;

  const listHeight = (() => {
    const maxHeight = Math.max(
      windowHeight -
        (innerEpisodeListRef.current?.offsetTop || 0) -
        (getCurrentTrack() ? mediaBarOffset : 0) -
        26,
      10 * rowHeight,
    );

    const calculatedHeight = episodes.length * rowHeight;

    if (calculatedHeight > maxHeight) {
      return maxHeight;
    }

    return calculatedHeight;
  })();

  const rowRenderer = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => (
    <div
      style={style}
      className={classNames(
        `py-2`,
        `px-4`,
        index % 2 === 0 ? "bg-white" : "bg-gray-100",
      )}
    >
      <EpisodeListItem episode={episodes[index]} />
    </div>
  );

  return (
    <PodcastContext.Provider value={episodes}>
      <section className={`flex-auto self-start w-full`} ref={episodeListRef}>
        <h1 className={`text-xl`}>{t("episodes")}</h1>
        <div
          ref={innerEpisodeListRef}
          className={`divide-y divide-gray-200 border border-grey-200 w-full`}
        >
          <List
            height={listHeight}
            width={episodeListRef.current?.offsetWidth || "100%"}
            itemCount={episodes.length}
            itemSize={rowHeight}
          >
            {rowRenderer}
          </List>
        </div>
      </section>
    </PodcastContext.Provider>
  );
}

export default EpisodeList;
