import { createContext } from "react";

import { Episode } from "../api/podcasts";
import { Songs } from "../api/songs";

const PodcastContext = createContext<Episode[]>([]);
PodcastContext.displayName = "Podcast";

export default PodcastContext;
