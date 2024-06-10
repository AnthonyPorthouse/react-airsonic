import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ArtistsQueryOptions } from ".";
import ArtistList from "../../../Components/ArtistList";
import Spinner from "../../../Components/Spinner";
import { useAuth } from "../../../Providers/AuthProvider";

export const Route = createLazyFileRoute("/_authenticated/artists/")({
  component: Artists,
  pendingComponent: Spinner,
});

function Artists() {
  const auth = useAuth();

  const { t } = useTranslation("artists");

  const { data } = useSuspenseQuery({
    ...ArtistsQueryOptions(auth),
    initialData: Route.useLoaderData(),
  });

  return (
    <div>
      <h1 className={`my-4 mb-1 text-4xl`}>{t("allArtists")}</h1>
      <ArtistList artists={data} />
    </div>
  );
}
