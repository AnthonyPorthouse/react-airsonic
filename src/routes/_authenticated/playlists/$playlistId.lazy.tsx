import AlbumHeader from "@components/AlbumHeader";
import Spinner from "@components/Spinner";
import TrackList from "@components/TrackList";
import { useAuth } from "@hooks/useAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, isNotFound } from "@tanstack/react-router";
import { t } from "i18next";

import { PlaylistQueryOptions } from "./$playlistId";

export const Route = createLazyFileRoute(
  "/_authenticated/playlists/$playlistId",
)({
  component: Playlist,
  pendingComponent: Spinner,
  errorComponent: () => {
    return (
      <div>
        <h2>{t("errors:genericError")}</h2>
      </div>
    );
  },
  notFoundComponent: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { playlistId } = Route.useParams();

    return (
      <div>
        <h2>{t("playlists:notFound", { id: playlistId })}</h2>
      </div>
    );
  },
});

function Playlist() {
  const { playlistId } = Route.useParams();
  const auth = useAuth();

  const initialData = Route.useLoaderData();

  if (isNotFound(initialData)) {
    throw initialData;
  }

  const { data } = useSuspenseQuery({
    ...PlaylistQueryOptions(playlistId, auth),
    initialData,
  });

  if (isNotFound(data)) {
    throw data;
  }

  const [playlist, songs] = data;
  return (
    <div className={`flex flex-auto flex-col gap-6 lg:flex-row`}>
      <AlbumHeader album={playlist} tracks={songs} />
      <TrackList tracks={songs} includeAdd />
    </div>
  );
}
