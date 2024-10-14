import { PodcastProvider } from "@/Providers/PodcastProvider.js";
import type { Episode } from "@api/types.js";
import { VirtualItem, useVirtualizer } from "@tanstack/react-virtual";
import classNames from "classnames";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import EpisodeListItem from "./EpisodeListItem.js";

interface EpisodeListProps {
  episodes: Episode[];
}

function EpisodeList({ episodes }: Readonly<EpisodeListProps>) {
  const { t } = useTranslation("podcasts");

  const episodeListRef = useRef<HTMLDivElement>(null);

  const rowHeight = 41;

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
    <PodcastProvider episodes={episodes}>
      <section
        className={`flex h-full w-full flex-auto flex-col justify-self-stretch`}
      >
        <h1 className={`text-xl`}>{t("episodes")}</h1>
        <div
          ref={episodeListRef}
          className={`border-grey-200 max-h-full w-full overflow-auto rounded border`}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: "relative",
            }}
            className={`relative w-full divide-y divide-gray-200`}
          >
            {virtualizer.getVirtualItems().map(rowRenderer)}
          </div>
        </div>
      </section>
    </PodcastProvider>
  );
}

export default EpisodeList;
