import type { Podcasts } from "@api/types.js";
import { lazy } from "react";

import List from "./List.js";

const PodcastView = lazy(() => import("./Podcast.js"));

interface PodcastListProps {
  className?: string;
  podcasts: Podcasts;
}

function PodcastList({ className, podcasts }: Readonly<PodcastListProps>) {
  return (
    <List className={className}>
      {podcasts.map((podcast) => (
        <PodcastView key={podcast.id} podcast={podcast} />
      ))}
    </List>
  );
}

export default PodcastList;
