import { Suspense, lazy } from "react";

import type { Podcasts } from "../api/podcasts";

const PodcastView = lazy(() => import("./Podcast"));
const Grid = lazy(() => import("./Grid"));

interface PodcastListProps {
  className?: string;
  podcasts: Podcasts;
}

function PodcastList({ className, podcasts }: PodcastListProps) {
  return (
    <Suspense fallback={null}>
      <Grid className={className}>
        {podcasts.map((podcast) => (
          <PodcastView key={podcast.id} podcast={podcast} />
        ))}
      </Grid>
    </Suspense>
  );
}

export default PodcastList;
