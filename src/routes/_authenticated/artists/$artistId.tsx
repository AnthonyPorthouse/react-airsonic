import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Authenticated } from "../../../Providers/AuthProvider";
import { getAlbum } from "../../../api/albums";
import { getArtist } from "../../../api/artists";

export const ArtistQueryOptions = (artistId: string, auth: Authenticated) => {
  return queryOptions({
    queryKey: ["artist", artistId, auth.credentials],
    queryFn: async () => {
      const [artist, albums] = await getArtist(artistId, auth.credentials);
      return {
        artist,
        albums: (
          await Promise.all(
            albums.map((album) => getAlbum(album.id, auth.credentials)),
          )
        ).sort((a, b) => (a[0].year < b[0].year ? -1 : 1)),
      };
    },
  });
};

export const Route = createFileRoute("/_authenticated/artists/$artistId")({
  loader: ({ context: { queryClient, auth }, params: { artistId } }) =>
    queryClient.ensureQueryData(ArtistQueryOptions(artistId, auth)),
});
