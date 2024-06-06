import { VirtualItem, useVirtualizer } from "@tanstack/react-virtual";
import classNames from "classnames";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { Songs } from "../api/songs.js";
import AlbumContext from "./AlbumContext.js";
import TrackListItem from "./TrackListItem.js";

interface TrackListProps {
  tracks: Songs;
  includeAdd?: boolean;
}

function TrackList({ tracks, includeAdd = false }: Readonly<TrackListProps>) {
  const { t } = useTranslation("albums");

  const trackListRef = useRef<HTMLDivElement>(null);

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
      <TrackListItem track={tracks[item.index]} includeAdd={includeAdd} />
    </div>
  );

  const virtualizer = useVirtualizer({
    count: tracks.length,
    getScrollElement: () => trackListRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  return (
    <AlbumContext.Provider value={tracks}>
      <section
        className={`flex h-full w-full flex-auto flex-col justify-self-stretch`}
      >
        <h1 className={`text-xl`}>{t("tracks")}</h1>
        <div
          ref={trackListRef}
          className="border-grey-200 max-h-full w-full overflow-auto rounded border"
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
    </AlbumContext.Provider>
  );
}

export default TrackList;
