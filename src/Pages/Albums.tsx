import React, { lazy, Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/features/authSlice";
import {
  getAllAlbumsFromApi,
  getAllAlbums,
  areAllAlbumsLoaded,
} from "../app/features/albumsSlice";
import Spinner from "../Components/Spinner";
import { useTranslation } from "react-i18next";

const AlbumList = lazy(() => import("../Components/AlbumList"));

function Albums() {
  const { t } = useTranslation("albums");

  const auth = useAppSelector(selectAuth);
  const albums = useAppSelector(getAllAlbums);
  const albumsLoaded = useAppSelector(areAllAlbumsLoaded);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const fetchAlbums = !loading && !albumsLoaded;

  useEffect(() => {
    if (fetchAlbums) {
      dispatch(getAllAlbumsFromApi(auth));
      setLoading(true);
    }
  }, [auth, dispatch, fetchAlbums]);

  return (
    <div>
      <h1 className={`text-2xl`}>{t("allAlbums")}</h1>

      <Suspense fallback={<Spinner />}>
        <AlbumList albums={albums} className={undefined} />
      </Suspense>
    </div>
  );
}

export default Albums;
