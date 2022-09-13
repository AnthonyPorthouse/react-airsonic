import { createContext, useContext } from "react";
import { Song, Songs } from "./api/songs";

export interface TrackList {
  trackList: Songs;
  setTrackList(tracks: Songs): void;
  currentTrack(): Song | null;
  nextTrack(): void;
}

let trackList: Songs = [];

export const TrackListContext = createContext<TrackList>({
  trackList: [],
  setTrackList: (tracks: Songs) => {
    console.log(`Setting Tracks`, tracks);
    trackList = tracks;
  },
  currentTrack: () => trackList[0],
  nextTrack: () => (trackList = trackList.slice(1)),
});

export function useTrackList() {
  return useContext(TrackListContext);
}
