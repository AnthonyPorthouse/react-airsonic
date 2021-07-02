import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import AlbumList from "../Components/AlbumList";
import { getArtistFromApi, getArtistById } from "../features/artistsSlice";
import { getAlbumsByIds } from "../features/albumsSlice";

function Artist() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const artist = useSelector((state) => getArtistById(state, id));
  const albums = useSelector((state) =>
    getAlbumsByIds(state, artist?.albums || [])
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading && !artist?.albums) {
      dispatch(getArtistFromApi({ id, ...auth }));
      setLoading(true);
    }
  }, [artist, auth, dispatch, id, loading]);

  if (!artist) {
    return null;
  }

  return (
    <div>
      <h1 className={`text-2xl`}>{artist.name}</h1>

      <AlbumList albums={albums} />
    </div>
  );
}

export default Artist;
