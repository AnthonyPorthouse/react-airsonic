import { VirtualItem, useVirtualizer } from "@tanstack/react-virtual";
import classNames from "classnames";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { Episode } from "../api/podcasts.js";
import EpisodeListItem from "./EpisodeListItem.js";
import PodcastContext from "./PodcastContext.js";

interface EpisodeListProps {
  episodes: Episode[];
}

function EpisodeList({ episodes }: Readonly<EpisodeListProps>) {
  const { t } = useTranslation("podcasts");

  const episodeListRef = useRef<HTMLDivElement>(null);

  const rowHeight = 40;

  const rowRenderer = (item: VirtualItem) => (
    <div
      key={item.key}
      style={{
        transform: `translateY(${item.start}px)`,
      }}
      className={classNames(
        `absolute`,
        `w-full`,
        `py-2`,
        `px-4`,
        `h-[${rowHeight}px]`,
        item.index % 2 === 0 ? "bg-white" : "bg-gray-100",
      )}
    >
      <EpisodeListItem episode={episodes[item.index]} />
    </div>
  );

  const virtualizer = useVirtualizer({
    count: episodes.length,
    getScrollElement: () => episodeListRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  return (
    <PodcastContext.Provider value={episodes}>
      <section
        className={`flex-auto justify-self-stretch w-full h-full flex flex-col`}
      >
        <h1 className={`text-xl`}>{t("episodes")}</h1>
        <div
          ref={episodeListRef}
          className={`overflow-auto w-full max-h-full border rounded border-grey-200`}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: "relative",
            }}
            className={`divide-y divide-gray-200 w-full relative`}
          >
            {virtualizer.getVirtualItems().map(rowRenderer)}
          </div>
        </div>
      </section>
    </PodcastContext.Provider>
  );
}

export default EpisodeList;
