import { QueryClient } from "@tanstack/react-query";
import { Outlet, rootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import React from "react";

import TitleInfo from "../Components/TitleInfo";
import { type Authenticated, useAuth } from "../Providers/AuthProvider";

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
