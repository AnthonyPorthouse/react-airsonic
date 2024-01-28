import { QueryClient } from "@tanstack/react-query";
import { Outlet, rootRouteWithContext } from "@tanstack/react-router";
import React from "react";

import TitleInfo from "../Components/TitleInfo";
import { type Authenticated, useAuth } from "../Providers/AuthProvider";

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

const MediaPlayer = React.lazy(() => import("../Components/MediaPlayer"));
const Nav = React.lazy(() => import("../Components/Nav"));

interface RouterContext {
  auth: Authenticated;
  queryClient: QueryClient;
}

export const Route = rootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated } = useAuth();

  return (
    <main
      className={`w-screen h-screen flex flex-col bg-gray-50 font-work-sans`}
    >
      {isAuthenticated && <Nav />}

      <TitleInfo />

      <div className={`overflow-y-auto flex-grow`}>
        <div className="mx-6 my-6">
          <Outlet />
        </div>
      </div>

      <TanStackRouterDevtools />

      {isAuthenticated && <MediaPlayer />}
    </main>
  );
}
