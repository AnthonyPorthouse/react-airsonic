import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import AlbumHeader from "../../../Components/AlbumHeader";
import Spinner from "../../../Components/Spinner";
import TrackList from "../../../Components/TrackList";
import { useAuth } from "../../../Providers/AuthProvider";
import { AlbumQueryOptions } from "./$albumId";

export const Route = createLazyFileRoute("/_authenticated/albums/$albumId")({
  component: Album,
  pendingComponent: Spinner,
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
    <div
      className={`flex h-full flex-auto flex-col justify-items-stretch gap-6 lg:flex-row`}
    >
      <AlbumHeader album={album} tracks={songs} />
      <TrackList tracks={songs} includeAdd />
    </div>
  );
}
