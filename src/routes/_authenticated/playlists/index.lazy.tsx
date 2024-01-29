import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import { PlaylistsQueryOptions } from ".";
import Grid from "../../../Components/Grid";
import Playlist from "../../../Components/Playlist";
import { useAuth } from "../../../Providers/AuthProvider";

export const Route = createLazyFileRoute("/_authenticated/playlists/")({
  component: Playlists,
});

function Playlists() {
  const auth = useAuth();

  const { data: playlists } = useSuspenseQuery({
    ...PlaylistsQueryOptions(auth),
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
