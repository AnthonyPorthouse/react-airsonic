import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Authenticated } from "../../../Providers/AuthProvider";
import { getArtist } from "../../../api/artists";

export const ArtistQueryOptions = (artistId: string, auth: Authenticated) => {
  return queryOptions({
    queryKey: ["artist", artistId, auth.credentials],
    queryFn: () => getArtist(artistId, auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/artists/$artistId")({
  loader: ({ context: { queryClient, auth }, params: { artistId } }) =>
    queryClient.ensureQueryData(ArtistQueryOptions(artistId, auth)),
});