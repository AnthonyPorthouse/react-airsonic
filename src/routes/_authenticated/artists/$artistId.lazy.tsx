import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import AlbumHeader from "../../../Components/AlbumHeader";
import Spinner from "../../../Components/Spinner";
import TrackList from "../../../Components/TrackList";
import { useAuth } from "../../../Providers/AuthProvider";
import { ArtistQueryOptions } from "./$artistId";

export const Route = createLazyFileRoute("/_authenticated/artists/$artistId")({
  component: Artist,
  pendingComponent: Spinner,
});

function Artist() {
  const { artistId } = Route.useParams();
  const auth = useAuth();

  const {
    data: { artist, albums },
  } = useSuspenseQuery({
    ...ArtistQueryOptions(artistId, auth),
    initialData: Route.useLoaderData(),
  });

  return (
    <div>
      <h1 className={`my-4 mb-1 text-4xl`}>{artist.name}</h1>

      <div className="flex flex-col gap-16">
        {albums.map(([album, songs]) => (
          <section
            key={album.id}
            aria-label={`${artist.name} - ${album.name} (${album.year})`}
            className={`flex h-full flex-auto flex-col justify-items-stretch gap-6 lg:flex-row`}
          >
            <AlbumHeader album={album} tracks={songs} />
            <TrackList tracks={songs} includeAdd />
          </section>
        ))}
      </div>
    </div>
  );
}
