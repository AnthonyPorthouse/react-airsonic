import type { Songs } from "@api/types.js";
import { AlbumProvider } from "@providers/AlbumProvider.js";
import { VirtualItem, useVirtualizer } from "@tanstack/react-virtual";
import classNames from "classnames";
import { motion } from "motion/react";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

import TrackListItem from "./TrackListItem.js";

interface TrackListProps {
  tracks: Songs;
  includeAdd?: boolean;
}

function TrackList({ tracks, includeAdd = false }: Readonly<TrackListProps>) {
  // eslint-disable-next-line react-compiler/react-compiler
  "use no memo";

  const { t } = useTranslation("albums");
  const trackListRef = useRef<HTMLDivElement>(null);

  const rowHeight = 41;

  const rowRenderer = useCallback(
    (item: VirtualItem) => {
      return (
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
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { delay: (item.index < 20 ? item.index : 20) / 20 },
            }}
          >
            <TrackListItem track={tracks[item.index]} includeAdd={includeAdd} />
          </motion.div>
        </div>
      );
    },
    [includeAdd, tracks],
  );

  const virtualizer = useVirtualizer({
    count: tracks.length,
    getScrollElement: () => trackListRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  return (
    <AlbumProvider tracks={tracks}>
      <section
        className={`flex h-full w-full flex-auto flex-col justify-self-stretch`}
        aria-label={
          tracks[0]
            ? `${tracks[0].artist} - ${tracks[0].album} ${t("tracks")}`
            : t("tracks")
        }
      >
        <div
          ref={trackListRef}
          className="border-grey-200 h-full max-h-full w-full overflow-auto rounded border"
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
    </AlbumProvider>
  );
}

export default TrackList;
