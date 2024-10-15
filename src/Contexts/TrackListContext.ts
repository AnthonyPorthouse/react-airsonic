import type { Song, Songs } from "@/api/types";
import { createContext } from "react";

export interface TrackList {
  trackList: Songs;
  addTrack(track: Song): void;
  setTrackList(tracks: Songs): void;
  getCurrentTrack(): Song | null;
  getNextTrack(): Song | null;
  nextTrack(): void;
}
export const TrackListContext = createContext<TrackList>({
  trackList: [],
  addTrack: () => {},
  setTrackList: () => {},
  getCurrentTrack: () => null,
  getNextTrack: () => null,
  nextTrack: () => {},
});
