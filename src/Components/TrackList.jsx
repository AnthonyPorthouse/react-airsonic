import TrackListItem from "./TrackListItem";
import AlbumContext from "./AlbumContext";

import { List } from "react-virtualized";
import { useMemo, useRef } from "react";
import classNames from "classnames";
import { useWindowHeight } from "@react-hook/window-size";

function TrackList({ tracks }) {
  const windowHeight = useWindowHeight();

  const trackListRef = useRef(null);

  const rowHeight = 40;

  const listHeight = (() => {
    const maxHeight = windowHeight - (trackListRef.current?.offsetTop || 0) - 26;

    const calculatedHeight = tracks.length * rowHeight;

    if (calculatedHeight > maxHeight) {
      return maxHeight;
    }

    return calculatedHeight;
  })()

  const rowRenderer = ({ key, index, style }) => (
      <div
        style={style}
        className={classNames(`py-2`, `px-4`, index % 2 === 0 ? "bg-white" : "bg-gray-100")}
        key={key}
      >
        <TrackListItem track={tracks[index]} />
      </div>
  )

  return (
    <AlbumContext.Provider value={tracks}>
      <section className={`flex-auto self-start w-full`}>
        <h1 className={`text-xl`}>Tracks</h1>
        <div ref={trackListRef} className={`divide-y divide-gray-200 border border-grey-200`}>
          <List
            height={listHeight}
            width={trackListRef.current?.offsetWidth || 0}
            rowCount={tracks.length}
            rowHeight={rowHeight}
            rowRenderer={rowRenderer}
          />
        </div>
      </section>
    </AlbumContext.Provider>
  );
}

export default TrackList;
