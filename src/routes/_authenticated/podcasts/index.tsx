import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import PodcastList from "../../../Components/PodcastList";
import { Authenticated, useAuth } from "../../../Providers/AuthProvider";
import { getPodcasts } from "../../../api/podcasts";

const PodcastsQueryOptions = (auth: Authenticated) =>
  queryOptions({
    queryKey: ["podcasts", auth.credentials],
    queryFn: () => getPodcasts(auth.credentials),
  });

export const Route = createFileRoute("/_authenticated/podcasts/")({
  loader: ({ context: { auth, queryClient } }) =>
    queryClient.ensureQueryData(PodcastsQueryOptions(auth)),
  component: Podcasts,
});

function Podcasts() {
  const auth = useAuth();

  const { data } = useSuspenseQuery({
    ...PodcastsQueryOptions(auth),
    initialData: Route.useLoaderData(),
  });

  return (
    <div>
      <h1 className={`text-2xl`}>Podcasts</h1>

      <div>
        <PodcastList podcasts={data} />
      </div>
    </div>
  );
}
