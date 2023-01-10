import { createContext } from "react";

import { Episode } from "../api/podcasts";

const PodcastContext = createContext<Episode[]>([]);
PodcastContext.displayName = "Podcast";

export default PodcastContext;
