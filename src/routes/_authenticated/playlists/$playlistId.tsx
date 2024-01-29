import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import AlbumHeader from "../../../Components/AlbumHeader";
import TrackList from "../../../Components/TrackList";
import { Authenticated, useAuth } from "../../../Providers/AuthProvider";
import { getPlaylist } from "../../../api/playlists";

const PlaylistQueryOptions = (playlistId: string, auth: Authenticated) =>
  queryOptions({
    queryKey: ["playlist", playlistId, auth.credentials],
    queryFn: () => getPlaylist(playlistId, auth.credentials),
  });

export const Route = createFileRoute("/_authenticated/playlists/$playlistId")({
  loader: ({ context: { auth, queryClient }, params: { playlistId } }) =>
    queryClient.ensureQueryData(PlaylistQueryOptions(playlistId, auth)),
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
