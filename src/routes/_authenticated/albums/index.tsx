import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Authenticated } from "../../../Providers/AuthProvider";
import { getAlbums } from "../../../api/albums";

export const AlbumsQueryOptions = (auth: Authenticated) => {
  return queryOptions({
    queryKey: ["albums", auth.credentials],
    queryFn: () => getAlbums(auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/albums/")({
  loader: ({ context: { queryClient, auth } }) =>
    queryClient.ensureQueryData(AlbumsQueryOptions(auth)),
});

