import { getAlbums } from "@api/albums";
import Spinner from "@components/Spinner";
import { Authenticated } from "@providers/AuthProvider";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const AlbumsQueryOptions = (auth: Authenticated) => {
  return queryOptions({
    queryKey: ["albums", auth.credentials],
    queryFn: () => getAlbums(auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/albums/")({
  pendingComponent: Spinner,
  loader: ({ context: { queryClient, auth } }) =>
    queryClient.ensureQueryData(AlbumsQueryOptions(auth)),
});
