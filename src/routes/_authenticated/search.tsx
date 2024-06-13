import { getSearchResults } from "@api/search";
import { Authenticated } from "@providers/AuthProvider";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const SearchQueryOptions = (query: string, auth: Authenticated) =>
  queryOptions({
    queryKey: ["search", query, auth.credentials],
    queryFn: () => getSearchResults(query, auth.credentials),
  });

export const Route = createFileRoute("/_authenticated/search")({
  loaderDeps: ({ search: { query } }) => ({ query }),
  loader: ({ context: { queryClient, auth }, deps: { query } }) =>
    queryClient.ensureQueryData(SearchQueryOptions(query ?? "", auth)),
});
