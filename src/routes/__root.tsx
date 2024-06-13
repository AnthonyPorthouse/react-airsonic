import TitleInfo from "@components/TitleInfo";
import { type Authenticated } from "@providers/AuthProvider";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import React, { Suspense } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

interface RouterContext {
  auth: Authenticated;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Suspense>
      <main
        className={`flex h-screen w-screen flex-col bg-gray-50 font-work-sans`}
      >
        <TitleInfo />

        <Outlet />

        <TanStackRouterDevtools />
      </main>
    </Suspense>
  );
}
