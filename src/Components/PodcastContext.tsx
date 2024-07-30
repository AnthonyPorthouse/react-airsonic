import type { Episode } from "@api/types.js";
import { createContext } from "react";

const PodcastContext = createContext<Episode[]>([]);

export default PodcastContext;
