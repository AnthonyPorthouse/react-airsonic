import { createRouter } from "@tanstack/react-router";
import { t } from "i18next";

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
        <h2>{t("errors:genericError")}</h2>
      </div>
    );
  },
  defaultNotFoundComponent: () => {
    return (
      <div>
        <h2>{t("errors:notFound")}</h2>
      </div>
    );
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
