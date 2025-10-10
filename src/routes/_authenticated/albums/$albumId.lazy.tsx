import AlbumHeader from "@components/AlbumHeader";
import TrackList from "@components/TrackList";
import { useAuth } from "@hooks/useAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, isNotFound } from "@tanstack/react-router";
import { t } from "i18next";

import { AlbumQueryOptions } from "./$albumId";

export const Route = createLazyFileRoute("/_authenticated/albums/$albumId")({
  component: Album,
  notFoundComponent: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { albumId } = Route.useParams();
    return (
      <div>
        <h2>{t("albums:notFound", { id: albumId })}</h2>
      </div>
    );
  },
});

function Album() {
  const { albumId } = Route.useParams();
  const auth = useAuth();

  const initialData = Route.useLoaderData();
  if (isNotFound(initialData)) {
    throw initialData;
  }

  const { data } = useSuspenseQuery({
    ...AlbumQueryOptions(albumId, auth),
    initialData,
  });

  if (isNotFound(data)) {
    throw data;
  }

  const [album, songs] = data;

  return (
    <div
      className={`flex h-full flex-auto flex-col justify-items-stretch gap-6 lg:flex-row`}
    >
      <AlbumHeader album={album} tracks={songs} />
      <TrackList tracks={songs} includeAdd />
    </div>
  );
}
