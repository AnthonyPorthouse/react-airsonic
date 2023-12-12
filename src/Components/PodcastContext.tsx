import { createContext } from "react";

import { Episode } from "../api/podcasts.js";

const PodcastContext = createContext<Episode[]>([]);
PodcastContext.displayName = "Podcast";

export default PodcastContext;
