import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import AlbumHeader from "../../../Components/AlbumHeader";
import TrackList from "../../../Components/TrackList";
import { Authenticated, useAuth } from "../../../Providers/AuthProvider";
import { getAlbum } from "../../../api/albums";

const AlbumQueryOptions = (albumId: string, auth: Authenticated) => {
  return queryOptions({
    queryKey: ["albums", albumId],
    queryFn: () => getAlbum(albumId, auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/albums/$albumId")({
  loader: ({ context: { queryClient, auth }, params: { albumId } }) =>
    queryClient.ensureQueryData(AlbumQueryOptions(albumId, auth)),
  component: Album,
});

function Album() {
  const { albumId } = Route.useParams();
  const auth = useAuth();
  const {
    data: [album, songs],
  } = useSuspenseQuery({
    ...AlbumQueryOptions(albumId, auth),
    initialData: Route.useLoaderData(),
  });

  return (
    <div className={`flex flex-auto flex-col lg:flex-row gap-6`}>
      <AlbumHeader album={album} tracks={songs} />
      <TrackList tracks={songs} />
    </div>
  );
}
