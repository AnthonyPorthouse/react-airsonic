import { TrackListContext } from "@/Contexts/TrackListContext";
import { useContext } from "react";

export function useTrackList() {
  return useContext(TrackListContext);
}
