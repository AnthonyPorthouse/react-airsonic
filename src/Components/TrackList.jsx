import TrackListItem from "./TrackListItem";
import AlbumContext from "./AlbumContext";

import { FixedSizeList as List } from "react-window";
import { useRef } from "react";
import classNames from "classnames";
import { useWindowHeight } from "@react-hook/window-size";
import { useSelector } from "react-redux";
import { selectCurrentTrack } from "../features/playlistSlice";

function TrackList({ tracks }) {
  const windowHeight = useWindowHeight();

  const trackListRef = useRef(null);
  const currentTrack = useSelector(selectCurrentTrack);

  const mediaBarOffset = 124;
  const rowHeight = 40;

  const listHeight = (() => {
    const maxHeight = Math.max(
      windowHeight -
        (trackListRef.current?.offsetTop || 0) -
        (currentTrack ? mediaBarOffset : 0) -
        26,
      10 * rowHeight
    );

    const calculatedHeight = tracks.length * rowHeight;

    if (calculatedHeight > maxHeight) {
      return maxHeight;
    }

    return calculatedHeight;
  })();

  const rowRenderer = ({ index, style }) => (
    <div
      style={style}
      className={classNames(
        `py-2`,
        `px-4`,
        index % 2 === 0 ? "bg-white" : "bg-gray-100"
      )}
    >
      <TrackListItem track={tracks[index]} />
    </div>
  );

  return (
    <AlbumContext.Provider value={tracks}>
      <section className={`flex-auto self-start w-full`}>
        <h1 className={`text-xl`}>Tracks</h1>
        <div
          ref={trackListRef}
          className={`divide-y divide-gray-200 border border-grey-200`}
        >
          <List
            height={listHeight}
            width={trackListRef.current?.offsetWidth || 0}
            itemCount={tracks.length}
            itemSize={rowHeight}
          >
            {rowRenderer}
          </List>
        </div>
      </section>
    </AlbumContext.Provider>
  );
}

export default TrackList;
