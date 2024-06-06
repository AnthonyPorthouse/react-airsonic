import { createLazyFileRoute } from "@tanstack/react-router";

import AlbumList from "../../Components/AlbumList";
import ArtistList from "../../Components/ArtistList";
import TrackList from "../../Components/TrackList";

export const Route = createLazyFileRoute("/_authenticated/search")({
  component: Search,
});

function Search() {
  const [artists, albums, songs] = Route.useLoaderData();

  return (
    <div className={`grid grid-cols-1 gap-6 md:grid-cols-2`}>
      {artists.length ? (
        <div className={``}>
          <h1 className={`text-xl`}>Artists</h1>
          <ArtistList
            className={`grid-cols-2 md:grid-cols-4`}
            artists={artists}
          />
        </div>
      ) : null}

      {albums.length ? (
        <div className={``}>
          <h1 className={`text-xl`}>Albums</h1>
          <AlbumList className={`grid-cols-2 md:grid-cols-4`} albums={albums} />
        </div>
      ) : null}

      <div className={`md:col-span-2`}>
        <TrackList tracks={songs} includeAdd />
      </div>
    </div>
  );
}
