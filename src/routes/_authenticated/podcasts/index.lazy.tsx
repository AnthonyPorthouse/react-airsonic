import PodcastList from "@components/PodcastList";
import Spinner from "@components/Spinner";
import { useAuth } from "@hooks/useAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, isNotFound } from "@tanstack/react-router";
import { t } from "i18next";

import { PodcastsQueryOptions } from ".";

export const Route = createLazyFileRoute("/_authenticated/podcasts/")({
  component: Podcasts,
  pendingComponent: Spinner,
});

function Podcasts() {
  const auth = useAuth();

  const initialData = Route.useLoaderData();
  if (isNotFound(initialData)) {
    throw initialData;
  }

  const { data } = useSuspenseQuery({
    ...PodcastsQueryOptions(auth),
    initialData,
  });

  if (isNotFound(data)) {
    throw data;
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center">
        <span className="text-gray-500">{t("podcasts:noneFound")}</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className={`text-2xl`}>{t("podcasts:podcasts")}</h1>

      <div>
        <PodcastList podcasts={data} />
      </div>
    </div>
  );
}
