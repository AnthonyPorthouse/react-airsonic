import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import AlbumList from "../../../Components/AlbumList";
import { Authenticated, useAuth } from "../../../Providers/AuthProvider";
import { type Albums, getAlbums } from "../../../api/albums";

const AlbumsQueryOptions = (auth: Authenticated) => {
  return queryOptions({
    queryKey: ["albums", auth.credentials],
    queryFn: () => getAlbums(auth.credentials),
  });
};

export const Route = createFileRoute("/_authenticated/albums/")({
  loader: ({ context: { queryClient, auth } }) =>
    queryClient.ensureQueryData(AlbumsQueryOptions(auth)),
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
      <h1 className={`text-2xl`}>{t("allAlbums")}</h1>

      <AlbumList albums={albums} />
    </div>
  );
}
