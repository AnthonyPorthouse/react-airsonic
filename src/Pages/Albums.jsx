import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import AlbumList from "../Components/AlbumList";
import {
  getAllAlbumsFromApi,
  getAllAlbums,
  areAllAlbumsLoaded,
} from "../features/albumsSlice";

function Albums() {
  const auth = useSelector(selectAuth);
  const albums = useSelector(getAllAlbums);
  const albumsLoaded = useSelector(areAllAlbumsLoaded);

  const dispatch = useDispatch();

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
      <h1 className={`text-2xl`}>All Albums</h1>

      <AlbumList albums={albums} />
    </div>
  );
}

export default Albums;
