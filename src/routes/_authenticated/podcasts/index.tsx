import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Authenticated } from "../../../Providers/AuthProvider";
import { getPodcasts } from "../../../api/podcasts";

export const PodcastsQueryOptions = (auth: Authenticated) =>
  queryOptions({
    queryKey: ["podcasts", auth.credentials],
    queryFn: () => getPodcasts(auth.credentials),
  });

export const Route = createFileRoute("/_authenticated/podcasts/")({
  loader: ({ context: { auth, queryClient } }) =>
    queryClient.ensureQueryData(PodcastsQueryOptions(auth)),
});
