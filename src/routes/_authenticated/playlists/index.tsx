import { Authenticated } from "@/Contexts/AuthContext";
import { getPlaylists } from "@api/playlists";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const PlaylistsQueryOptions = (auth: Authenticated) => {
  return queryOptions({
    queryKey: ["playlists", auth.credentials],
    queryFn: () => getPlaylists(auth.credentials) || [],
  });
};

export const Route = createFileRoute("/_authenticated/playlists/")({
  loader: ({ context: { auth, queryClient } }) =>
    queryClient.ensureQueryData(PlaylistsQueryOptions(auth)),
});
