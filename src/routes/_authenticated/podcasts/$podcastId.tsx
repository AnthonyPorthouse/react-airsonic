import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Authenticated } from "../../../Providers/AuthProvider";
import { getPodcast } from "../../../api/podcasts";

export const PodcastQueryOptions = (podcastId: string, auth: Authenticated) =>
  queryOptions({
    queryKey: ["podcasts", podcastId, auth.credentials],
    queryFn: () => getPodcast(podcastId, auth.credentials),
  });

export const Route = createFileRoute("/_authenticated/podcasts/$podcastId")({
  loader: ({ context: { auth, queryClient }, params: { podcastId } }) =>
    queryClient.ensureQueryData(PodcastQueryOptions(podcastId, auth)),
});
