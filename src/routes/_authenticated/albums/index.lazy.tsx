import AlbumList from "@components/AlbumList";
import { useAuth } from "@providers/AuthProvider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { AlbumsQueryOptions } from ".";

export const Route = createLazyFileRoute("/_authenticated/albums/")({
  component: Albums,
});

function Albums() {
  const auth = useAuth();
  const { t } = useTranslation("albums");

  const { data } = useSuspenseQuery({
    ...AlbumsQueryOptions(auth),
    initialData: Route.useLoaderData(),
  });

  const albums = useMemo(
    () => [...data].sort((a, b) => a.name.localeCompare(b.name)),
    [data],
  );

  return (
    <div>
      <h1 className={`my-4 mb-1 text-4xl`}>{t("allAlbums")}</h1>

      <AlbumList albums={albums} />
    </div>
  );
}
