import EpisodeList from "@components/EpisodeList";
import PodcastHeader from "@components/PodcastHeader";
import Spinner from "@components/Spinner";
import { useAuth } from "@hooks/useAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, isNotFound } from "@tanstack/react-router";

import { PodcastQueryOptions } from "./$podcastId";

export const Route = createLazyFileRoute("/_authenticated/podcasts/$podcastId")(
  {
    component: Podcast,
    pendingComponent: Spinner,
    errorComponent: () => {
      return (
        <div>
          <h2>Something Went Wrong</h2>
        </div>
      );
    },
    notFoundComponent: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { podcastId } = Route.useParams();
      return (
        <div>
          <h2>Podcast {podcastId} not found</h2>
        </div>
      );
    },
  },
);

function Podcast() {
  const { podcastId } = Route.useParams();
  const auth = useAuth();

  const initialData = Route.useLoaderData();

  if (isNotFound(initialData)) {
    throw initialData;
  }

  const { data } = useSuspenseQuery({
    ...PodcastQueryOptions(podcastId, auth),
    initialData,
  });

  if (isNotFound(data)) {
    throw data;
  }

  const [podcast, episodes] = data;

  return (
    <div className={`flex flex-auto flex-col gap-6 lg:flex-row`}>
      <PodcastHeader podcast={podcast} />
      <EpisodeList episodes={episodes} />
    </div>
  );
}
