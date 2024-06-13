import { Episode } from "@api/podcasts.js";
import { createContext } from "react";

const PodcastContext = createContext<Episode[]>([]);

export default PodcastContext;
