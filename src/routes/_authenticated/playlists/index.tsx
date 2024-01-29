import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import Grid from "../../../Components/Grid";
import Playlist from "../../../Components/Playlist";
import { Authenticated, useAuth } from "../../../Providers/AuthProvider";
import { getPlaylists } from "../../../api/playlists";

const AlbumsQueryOptions = (auth: Authenticated) => {
  return queryOptions({
    queryKey: ["playlists", auth.credentials],
    queryFn: () => getPlaylists(auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/playlists/")({
  loader: ({ context: { auth, queryClient } }) =>
    queryClient.ensureQueryData(AlbumsQueryOptions(auth)),
  component: Playlists,
});

function Playlists() {
  const auth = useAuth();

  const { data: playlists } = useSuspenseQuery({
    ...AlbumsQueryOptions(auth),
    initialData: Route.useLoaderData(),
  });

  return (
    <div>
      <Grid>
        {playlists.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} />
        ))}
      </Grid>
    </div>
  );
}
