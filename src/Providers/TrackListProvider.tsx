import type { Song, Songs } from "@api/types.js";
import { ReactNode, useCallback, useMemo, useState } from "react";

import { TrackListContext } from "../Contexts/TrackListContext";

export function TrackListProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [trackList, setTrackList] = useState<Songs>([]);
  const [trackListPosition, setTrackListPosition] = useState(0);

  const getCurrentTrack = useCallback(
    () => trackList[trackListPosition] ?? null,
    [trackList, trackListPosition],
  );

  const getNextTrack = useCallback(
    () => trackList.at(trackListPosition + 1) ?? null,
    [trackList, trackListPosition],
  );

  const nextTrack = useCallback(
    () =>
      setTrackListPosition(
        Math.max(0, Math.min(trackList.length - 1, trackListPosition + 1)),
      ),
    [trackList, trackListPosition],
  );

  const trackListValue = useMemo(() => {
    return {
      trackList,
      addTrack: (song: Song) => {
        setTrackList([...trackList, song]);
      },
      setTrackList: (songs: Songs) => {
        setTrackListPosition(0);
        setTrackList(songs);
      },
      getCurrentTrack,
      getNextTrack,
      nextTrack,
    };
  }, [
    trackList,
    setTrackListPosition,
    setTrackList,
    getCurrentTrack,
    getNextTrack,
    nextTrack,
  ]);

  return (
    <TrackListContext.Provider value={trackListValue}>
      {children}
    </TrackListContext.Provider>
  );
}
