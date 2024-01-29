import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Authenticated } from "../../../Providers/AuthProvider";
import { getPlaylists } from "../../../api/playlists";

export const PlaylistsQueryOptions = (auth: Authenticated) => {
  return queryOptions({
    queryKey: ["playlists", auth.credentials],
    queryFn: () => getPlaylists(auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/playlists/")({
  loader: ({ context: { auth, queryClient } }) =>
    queryClient.ensureQueryData(PlaylistsQueryOptions(auth)),
});