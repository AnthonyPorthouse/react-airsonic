import { getAlbum } from "@api/albums";
import Spinner from "@components/Spinner";
import { Authenticated } from "@providers/AuthProvider";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const AlbumQueryOptions = (albumId: string, auth: Authenticated) => {
  return queryOptions({
    queryKey: ["albums", albumId, auth.credentials],
    queryFn: () => getAlbum(albumId, auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/albums/$albumId")({
  pendingComponent: Spinner,
  loader: ({ context: { queryClient, auth }, params: { albumId } }) =>
    queryClient.ensureQueryData(AlbumQueryOptions(albumId, auth)),
});
