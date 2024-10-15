import type { Episode } from "@api/types.js";
import { PropsWithChildren } from "react";

import { PodcastContext } from "../Contexts/PodcastContext";

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
