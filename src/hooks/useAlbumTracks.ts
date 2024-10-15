import { AlbumContext } from "@/Contexts/AlbumContext";
import { useContext } from "react";

export function useAlbumTracks() {
  return useContext(AlbumContext);
}
