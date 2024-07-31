import type { Episode } from "@api/types.js";
import { PropsWithChildren, createContext, useContext } from "react";

export const PodcastContext = createContext<Episode[]>([]);

export function PodcastProvider({
  children,
  episodes,
}: PropsWithChildren<{ episodes: Episode[] }>) {
  return (
    <PodcastContext.Provider value={episodes}>
      {children}
    </PodcastContext.Provider>
  );
}

export function useEpisodes(): Episode[] {
  return useContext(PodcastContext);
}
