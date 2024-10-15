import { Authenticated } from "@/Contexts/AuthContext";
import { getArtists } from "@api/artists";
import Spinner from "@components/Spinner";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const ArtistsQueryOptions = (auth: Authenticated) => {
  return queryOptions({
    queryKey: ["artists", auth.credentials],
    queryFn: () => getArtists(auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/artists/")({
  pendingComponent: Spinner,
  loader: ({ context: { queryClient, auth } }) =>
    queryClient.ensureQueryData(ArtistsQueryOptions(auth)),
});
