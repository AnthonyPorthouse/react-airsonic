import { getPlaylist } from "@api/playlists";
import { Authenticated } from "@providers/AuthProvider";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const PlaylistQueryOptions = (playlistId: string, auth: Authenticated) =>
  queryOptions({
    queryKey: ["playlist", playlistId, auth.credentials],
    queryFn: () => getPlaylist(playlistId, auth.credentials),
  });

export const Route = createFileRoute("/_authenticated/playlists/$playlistId")({
  loader: ({ context: { auth, queryClient }, params: { playlistId } }) =>
    queryClient.ensureQueryData(PlaylistQueryOptions(playlistId, auth)),
});
