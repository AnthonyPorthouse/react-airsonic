import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import AlbumList from "../../../Components/AlbumList";
import { Authenticated, useAuth } from "../../../Providers/AuthProvider";
import { getArtist } from "../../../api/artists";

const ArtistQueryOptions = (artistId: string, auth: Authenticated) => {
  return queryOptions({
    queryKey: ["artist", artistId],
    queryFn: () => getArtist(artistId, auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/artists/$artistId")({
  loader: ({ context: { queryClient, auth }, params: { artistId } }) =>
    queryClient.ensureQueryData(ArtistQueryOptions(artistId, auth)),
  component: Artist,
});

function Artist() {
  const { artistId } = Route.useParams();
  const auth = useAuth();

  const {
    data: [artist, albums],
  } = useSuspenseQuery({
    ...ArtistQueryOptions(artistId, auth),
    initialData: Route.useLoaderData(),
  });

  return (
    <div>
      <h1 className={`text-2xl`}>{artist.name}</h1>

      <AlbumList albums={albums} />
    </div>
  );
}
