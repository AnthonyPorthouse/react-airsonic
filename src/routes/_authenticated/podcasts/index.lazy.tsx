import PodcastList from "@components/PodcastList";
import Spinner from "@components/Spinner";
import { useAuth } from "@hooks/useAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import { PodcastsQueryOptions } from ".";

export const Route = createLazyFileRoute("/_authenticated/podcasts/")({
  component: Podcasts,
  pendingComponent: Spinner,
});

function Podcasts() {
  const auth = useAuth();

  const { data } = useSuspenseQuery({
    ...PodcastsQueryOptions(auth),
    initialData: Route.useLoaderData(),
  });

  if (data.length === 0) {
    return (
      <div className="flex justify-center">
        <span className="text-gray-500">No Podcasts Found</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className={`text-2xl`}>Podcasts</h1>

      <div>
        <PodcastList podcasts={data} />
      </div>
    </div>
  );
}
