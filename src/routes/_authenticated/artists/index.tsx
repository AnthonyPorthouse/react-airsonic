import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Authenticated } from "../../../Providers/AuthProvider";
import { getArtists } from "../../../api/artists";

export const ArtistsQueryOptions = (auth: Authenticated) => {
  return queryOptions({
    queryKey: ["artists", auth.credentials],
    queryFn: () => getArtists(auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/artists/")({
  loader: ({ context: { queryClient, auth } }) =>
    queryClient.ensureQueryData(ArtistsQueryOptions(auth)),
});
