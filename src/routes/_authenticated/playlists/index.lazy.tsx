import Grid from "@components/Grid";
import Playlist from "@components/Playlist";
import Spinner from "@components/Spinner";
import { useAuth } from "@hooks/useAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, isNotFound } from "@tanstack/react-router";
import { t } from "i18next";

import { PlaylistsQueryOptions } from ".";

export const Route = createLazyFileRoute("/_authenticated/playlists/")({
  component: Playlists,
  pendingComponent: Spinner,
});

function Playlists() {
  const auth = useAuth();

  const initialData = Route.useLoaderData();
  if (isNotFound(initialData)) {
    throw initialData;
  }

  const { data: playlists } = useSuspenseQuery({
    ...PlaylistsQueryOptions(auth),
    initialData,
  });

  if (isNotFound(playlists)) {
    throw playlists;
  }

  if (playlists.length === 0) {
    return (
      <div className="flex justify-center">
        <span className="text-gray-500">{t("playlists:noPlaylists")}</span>
      </div>
    );
  }

  return (
    <div>
      <Grid>
        {playlists.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} />
        ))}
      </Grid>
    </div>
  );
}
