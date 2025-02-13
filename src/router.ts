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
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
