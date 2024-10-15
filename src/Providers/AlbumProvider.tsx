import { AlbumContext } from "@/Contexts/AlbumContext";
import type { Songs } from "@api/types.js";
import { PropsWithChildren } from "react";

export function AlbumProvider({
  children,
  tracks,
}: PropsWithChildren<{ tracks: Songs }>) {
  return (
    <AlbumContext.Provider value={tracks}>{children}</AlbumContext.Provider>
  );
}
