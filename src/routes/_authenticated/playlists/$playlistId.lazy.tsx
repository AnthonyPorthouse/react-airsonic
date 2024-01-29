import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import AlbumHeader from "../../../Components/AlbumHeader";
import TrackList from "../../../Components/TrackList";
import { useAuth } from "../../../Providers/AuthProvider";
import { PlaylistQueryOptions } from "./$playlistId";

export const Route = createLazyFileRoute(
  "/_authenticated/playlists/$playlistId",
)({
  component: Playlist,
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
    <div className={`flex flex-auto flex-col lg:flex-row gap-6`}>
      <AlbumHeader album={playlist} tracks={songs} />
      {<TrackList tracks={songs} />}
    </div>
  );
}
