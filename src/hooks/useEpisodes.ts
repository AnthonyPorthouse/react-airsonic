import { PodcastContext } from "@/Contexts/PodcastContext";
import type { Episode } from "@/api/types";
import { useContext } from "react";

export function useEpisodes(): Episode[] {
  return useContext(PodcastContext);
}
