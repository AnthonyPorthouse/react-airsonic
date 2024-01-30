import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import EpisodeList from "../../../Components/EpisodeList";
import PodcastHeader from "../../../Components/PodcastHeader";
import Spinner from "../../../Components/Spinner";
import { useAuth } from "../../../Providers/AuthProvider";
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
    <div className={`flex flex-auto flex-col lg:flex-row gap-6`}>
      <PodcastHeader podcast={podcast} />
      <EpisodeList episodes={episodes} />
    </div>
  );
}
