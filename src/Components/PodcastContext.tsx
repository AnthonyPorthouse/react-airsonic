import { createContext } from "react";

import { Episode } from "../api/podcasts.js";

const PodcastContext = createContext<Episode[]>([]);

export default PodcastContext;
