import { useQuery } from "@tanstack/react-query";
import React, { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";

import Spinner from "../Components/Spinner";
import { getAlbums } from "../api/albums";
import { useAuth } from "../api/auth";

const AlbumList = lazy(() => import("../Components/AlbumList"));

function Albums() {
  const { t } = useTranslation("albums");

  const auth = useAuth();

  const { isSuccess, data } = useQuery(
    ["albums"],
    () => getAlbums(auth.credentials),
    {
      enabled: auth.isAuthenticated,
    }
  );

  return (
    <div>
      <h1 className={`text-2xl`}>{t("allAlbums")}</h1>

      <Suspense fallback={<Spinner />}>
        <AlbumList
          albums={
            isSuccess ? data.sort((a, b) => a.name.localeCompare(b.name)) : []
          }
        />
      </Suspense>
    </div>
  );
}

export default Albums;
