import Grid from "@components/Grid";
import Playlist from "@components/Playlist";
import Spinner from "@components/Spinner";
import { useAuth } from "@hooks/useAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import { PlaylistsQueryOptions } from ".";

export const Route = createLazyFileRoute("/_authenticated/playlists/")({
  component: Playlists,
  pendingComponent: Spinner,
});

function Playlists() {
  const auth = useAuth();

  const { data: playlists } = useSuspenseQuery({
    ...PlaylistsQueryOptions(auth),
    initialData: Route.useLoaderData(),
  });

  if (playlists.length === 0) {
    return (
      <div className="flex justify-center">
        <span className="text-gray-500">No Playlists Found</span>
      </div>
    );
  }

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
