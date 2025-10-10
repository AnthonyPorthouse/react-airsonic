import AlbumList from "@components/AlbumList";
import ArtistList from "@components/ArtistList";
import TrackList from "@components/TrackList";
import { createLazyFileRoute } from "@tanstack/react-router";
import { t } from "i18next";

export const Route = createLazyFileRoute("/_authenticated/search")({
  component: Search,
});

function Search() {
  const [artists, albums, songs] = Route.useLoaderData();

  return (
    <div className={`grid grid-cols-1 gap-6 md:grid-cols-2`}>
      {artists.length ? (
        <div className={``}>
          <h1 className={`text-xl`}>{t("nav:artists")}</h1>
          <ArtistList
            className={`grid-cols-2 md:grid-cols-4`}
            artists={artists}
          />
        </div>
      ) : null}

      {albums.length ? (
        <div className={``}>
          <h1 className={`text-xl`}>{t("nav:albums")}</h1>
          <AlbumList className={`grid-cols-2 md:grid-cols-4`} albums={albums} />
        </div>
      ) : null}

      <div className={`md:col-span-2`}>
        <TrackList tracks={songs} includeAdd />
      </div>
    </div>
  );
}
