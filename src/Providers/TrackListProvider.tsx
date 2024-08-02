import type { Song, Songs } from "@api/types.js";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface TrackList {
  trackList: Songs;
  addTrack(track: Song): void;
  setTrackList(tracks: Songs): void;
  getCurrentTrack(): Song | null;
  getNextTrack(): Song | null;
  nextTrack(): void;
}

const TrackListContext = createContext<TrackList>({
  trackList: [],
  addTrack: () => {},
  setTrackList: () => {},
  getCurrentTrack: () => null,
  getNextTrack: () => null,
  nextTrack: () => {},
});

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

export function useTrackList() {
  return useContext(TrackListContext);
}
