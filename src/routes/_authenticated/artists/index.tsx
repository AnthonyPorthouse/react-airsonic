import {
  queryOptions,
  useSuspenseQuery
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import ArtistList from "../../../Components/ArtistList";
import { Authenticated, useAuth } from "../../../Providers/AuthProvider";
import { getArtists } from "../../../api/artists";

const ArtistsQueryOptions = (auth: Authenticated) => {
  return queryOptions({
    queryKey: ["artists", auth.credentials],
    queryFn: () => getArtists(auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/artists/")({
  loader: ({ context: { queryClient, auth } }) =>
    queryClient.ensureQueryData(ArtistsQueryOptions(auth)),
  component: Artists,
});

function Artists() {
  const auth = useAuth();

  const { data } = useSuspenseQuery({
    ...ArtistsQueryOptions(auth),
    initialData: Route.useLoaderData(),
  });

  return (
    <div>
      <h1 className={`text-2xl`}>All Artists</h1>

      <ArtistList artists={data} />
    </div>
  );
}
