import EpisodeList from "@components/EpisodeList";
import PodcastHeader from "@components/PodcastHeader";
import Spinner from "@components/Spinner";
import { useAuth } from "@providers/AuthProvider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import { PodcastQueryOptions } from "./$podcastId";

export const Route = createLazyFileRoute("/_authenticated/podcasts/$podcastId")(
  {
    component: Podcast,
    pendingComponent: Spinner,
  },
);

function Podcast() {
  const { podcastId } = Route.useParams();
  const auth = useAuth();

  const {
    data: [podcast, episodes],
  } = useSuspenseQuery({
    ...PodcastQueryOptions(podcastId, auth),
    initialData: Route.useLoaderData(),
  });

  return (
    <div className={`flex flex-auto flex-col gap-6 lg:flex-row`}>
      <PodcastHeader podcast={podcast} />
      <EpisodeList episodes={episodes} />
    </div>
  );
}
