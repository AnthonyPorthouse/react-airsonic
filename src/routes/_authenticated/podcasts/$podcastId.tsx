import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import EpisodeList from "../../../Components/EpisodeList";
import PodcastHeader from "../../../Components/PodcastHeader";
import { Authenticated, useAuth } from "../../../Providers/AuthProvider";
import { getPodcast } from "../../../api/podcasts";

const PodcastQueryOptions = (podcastId: string, auth: Authenticated) =>
  queryOptions({
    queryKey: ["podcasts", podcastId],
    queryFn: () => getPodcast(podcastId, auth.credentials),
  });

export const Route = createFileRoute("/_authenticated/podcasts/$podcastId")({
  loader: ({ context: { auth, queryClient }, params: { podcastId } }) =>
    queryClient.ensureQueryData(PodcastQueryOptions(podcastId, auth)),
  component: Podcast,
});

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
