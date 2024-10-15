import { Authenticated } from "@/Contexts/AuthContext";
import { getPodcasts } from "@api/podcasts";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const PodcastsQueryOptions = (auth: Authenticated) =>
  queryOptions({
    queryKey: ["podcasts", auth.credentials],
    queryFn: () => getPodcasts(auth.credentials),
  });

export const Route = createFileRoute("/_authenticated/podcasts/")({
  loader: ({ context: { auth, queryClient } }) =>
    queryClient.ensureQueryData(PodcastsQueryOptions(auth)),
});
