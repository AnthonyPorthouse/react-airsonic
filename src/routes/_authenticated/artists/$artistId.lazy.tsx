import AlbumHeader from "@components/AlbumHeader";
import TrackList from "@components/TrackList";
import { createLazyFileRoute, isNotFound } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/artists/$artistId")({
  component: Artist,
  notFoundComponent: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { artistId } = Route.useParams();
    return (
      <div>
        <h2>Artist {artistId} not found</h2>
      </div>
    );
  },
});

function Artist() {
  const data = Route.useLoaderData();

  if (isNotFound(data)) {
    throw data;
  }

  const { artist, albums } = data;

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
