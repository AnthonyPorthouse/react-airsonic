import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Authenticated } from "../../Providers/AuthProvider";
import { getSearchResults } from "../../api/search";

export const SearchQueryOptions = (query: string, auth: Authenticated) =>
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
});
