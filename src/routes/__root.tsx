import { type Authenticated } from "@/Contexts/AuthContext";
import TitleInfo from "@components/TitleInfo";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Suspense } from "react";

interface RouterContext {
  auth: Authenticated;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  errorComponent: () => {
    return (
      <div>
        <h2>Something Went Wrong</h2>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <Suspense>
      <main
        className={`font-work-sans flex h-screen w-screen flex-col bg-gray-50`}
      >
        <TitleInfo />

        <Outlet />

        <TanStackRouterDevtools />
      </main>
    </Suspense>
  );
}
