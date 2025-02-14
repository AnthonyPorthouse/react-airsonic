import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: undefined!,
    queryClient: undefined!,
  },
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: () => {
    return (
      <div>
        <h2>Something Went Wrong</h2>
      </div>
    );
  },
  defaultNotFoundComponent: () => {
    return (
      <div>
        <h2>Not Found</h2>
      </div>
    );
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
