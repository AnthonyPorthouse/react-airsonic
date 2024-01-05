import { Suspense, lazy } from "react";

import type { Podcasts } from "../api/podcasts.js";

const PodcastView = lazy(() => import("./Podcast.js"));
const Grid = lazy(() => import("./Grid.js"));

interface PodcastListProps {
  className?: string;
  podcasts: Podcasts;
}

function PodcastList({ className, podcasts }: Readonly<PodcastListProps>) {
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
