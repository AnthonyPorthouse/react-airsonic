import { RouterProvider, createRouter } from "@tanstack/react-router";

import { useAuth } from "./Providers/AuthProvider.js";
import { queryClient } from "./index.js";
import { routeTree } from "./routeTree.gen.js";

const router = createRouter({
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

function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth, queryClient }} />;
}

export default App;
