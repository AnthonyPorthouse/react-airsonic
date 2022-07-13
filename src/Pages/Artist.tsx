import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/features/authSlice";
import AlbumList from "../Components/AlbumList";
import { getArtistFromApi, getArtistById } from "../app/features/artistsSlice";
import { getAlbumsByIds } from "../app/features/albumsSlice";

type ArtistParams = {
  id: string;
};

function Artist() {
  const id = useParams<ArtistParams>()["id"] || "";

  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const artist = useAppSelector((state) => getArtistById(state, id));
  const albums = useAppSelector((state) =>
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
