import AlbumHeader from "@components/AlbumHeader";
import Spinner from "@components/Spinner";
import TrackList from "@components/TrackList";
import { useAuth } from "@providers/AuthProvider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import { PlaylistQueryOptions } from "./$playlistId";

export const Route = createLazyFileRoute(
  "/_authenticated/playlists/$playlistId",
)({
  component: Playlist,
  pendingComponent: Spinner,
});

function Playlist() {
  const { playlistId } = Route.useParams();
  const auth = useAuth();

  const { data } = useSuspenseQuery({
    ...PlaylistQueryOptions(playlistId, auth),
    initialData: Route.useLoaderData(),
  });

  const [playlist, songs] = data;
  return (
    <div className={`flex flex-auto flex-col gap-6 lg:flex-row`}>
      <AlbumHeader album={playlist} tracks={songs} />
      <TrackList tracks={songs} includeAdd />
    </div>
  );
}
