import { Song, Songs } from "@api/songs.js";
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
  getNextTrack(): Song | undefined;
  nextTrack(): void;
}

let trackList: Songs = [];

export const TrackListContext = createContext<TrackList>({
  trackList: [],
  addTrack: () => {},
  setTrackList: (tracks: Songs) => {
    trackList = tracks;
  },
  getCurrentTrack: () => trackList[0],
  getNextTrack: () => trackList.at(1),
  nextTrack: () => (trackList = trackList.slice(1)),
});

export function TrackListProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [trackList, setTrackList] = useState<Songs>([]);
  const [trackListPosition, setTrackListPosition] = useState(0);

  const getCurrentTrack = useCallback(
    () => trackList[trackListPosition],
    [trackList, trackListPosition],
  );

  const getNextTrack = useCallback(
    () => trackList.at(trackListPosition + 1),
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
