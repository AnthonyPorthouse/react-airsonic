import { createContext, useContext } from "react";

import { Song, Songs } from "./api/songs.js";

export interface TrackList {
  trackList: Songs;
  setTrackList(tracks: Songs): void;
  getCurrentTrack(): Song | null;
  nextTrack(): void;
}

let trackList: Songs = [];

export const TrackListContext = createContext<TrackList>({
  trackList: [],
  setTrackList: (tracks: Songs) => {
    trackList = tracks;
  },
  getCurrentTrack: () => trackList[0],
  nextTrack: () => (trackList = trackList.slice(1)),
});

TrackListContext.displayName = "TrackListProvider";

export function useTrackList() {
  return useContext(TrackListContext);
}
