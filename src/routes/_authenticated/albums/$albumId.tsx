import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Authenticated } from "../../../Providers/AuthProvider";
import { getAlbum } from "../../../api/albums";

export const AlbumQueryOptions = (albumId: string, auth: Authenticated) => {
  return queryOptions({
    queryKey: ["albums", albumId, auth.credentials],
    queryFn: () => getAlbum(albumId, auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/albums/$albumId")({
  loader: ({ context: { queryClient, auth }, params: { albumId } }) =>
    queryClient.ensureQueryData(AlbumQueryOptions(albumId, auth)),
});