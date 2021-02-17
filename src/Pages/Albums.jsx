import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import AlbumList from "../Components/AlbumList";
import { getAllAlbums, selectAllAlbums } from "../features/albumsSlice";

function Albums() {
  const auth = useSelector(selectAuth);
  const albums = useSelector(selectAllAlbums);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      dispatch(getAllAlbums({ ...auth }));
      setLoading(true);
    }
  }, [auth, dispatch, loading]);

  return (
    <div>
      <h1 className={`text-2xl`}>All Albums</h1>

      <AlbumList albums={albums} />
    </div>
  );
}

export default Albums;
