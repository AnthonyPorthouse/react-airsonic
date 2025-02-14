import { Authenticated } from "@/Contexts/AuthContext";
import { getArtist } from "@api/artists";
import Spinner from "@components/Spinner";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute, isNotFound } from "@tanstack/react-router";

import { AlbumQueryOptions } from "../albums/$albumId";

export const ArtistQueryOptions = (artistId: string, auth: Authenticated) => {
  return queryOptions({
    queryKey: ["artist", artistId, auth.credentials],
    queryFn: async () => {
      return getArtist(artistId, auth.credentials);
    },
  });
};

export const Route = createFileRoute("/_authenticated/artists/$artistId")({
  pendingComponent: Spinner,
  loader: async ({ context: { queryClient, auth }, params: { artistId } }) => {
    const data = await queryClient.ensureQueryData(
      ArtistQueryOptions(artistId, auth),
    );

    if (isNotFound(data)) {
      return data;
    }

    const [artist, albums] = data;

    const fullAlbums = (
      await Promise.all(
        albums.map((album) =>
          queryClient.ensureQueryData(AlbumQueryOptions(album.id, auth)),
        ),
      )
    ).sort((a, b) => (a[0].year < b[0].year ? -1 : 1));

    return { artist, albums: fullAlbums };
  },
});
