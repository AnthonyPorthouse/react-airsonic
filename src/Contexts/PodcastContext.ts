import type { Episode } from "@/api/types";
import { createContext } from "react";

export const PodcastContext = createContext<Episode[]>([]);
