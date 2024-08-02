import type { Songs } from "@api/types.js";
import { PropsWithChildren, createContext, useContext } from "react";

const AlbumContext = createContext<Songs>([]);

export function AlbumProvider({
  children,
  tracks,
}: PropsWithChildren<{ tracks: Songs }>) {
  return (
    <AlbumContext.Provider value={tracks}>{children}</AlbumContext.Provider>
  );
}

export function useAlbumTracks() {
  return useContext(AlbumContext);
}
