import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import AlbumList from "../../Components/AlbumList";
import ArtistList from "../../Components/ArtistList";
import TrackList from "../../Components/TrackList";
import { Authenticated } from "../../Providers/AuthProvider";
import { getSearchResults } from "../../api/search";

const SearchQueryOptions = (query: string, auth: Authenticated) =>
  queryOptions({
    queryKey: ["search", query, auth.credentials],
    queryFn: () => getSearchResults(query, auth.credentials),
  });

export const Route = createFileRoute("/_authenticated/search")({
  validateSearch: z.object({
    query: z.string().catch(""),
  }),

  loaderDeps: ({ search: { query } }) => ({ query }),
  loader: ({ context: { queryClient, auth }, deps: { query } }) =>
    queryClient.ensureQueryData(SearchQueryOptions(query, auth)),

  component: Search,
});

function Search() {
  const [artists, albums, songs] = Route.useLoaderData();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
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
        <TrackList tracks={songs} />
      </div>
    </div>
  );
}
