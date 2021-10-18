import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/features/authSlice";
import { useEffect, useState } from "react";
import TrackList from "../Components/TrackList";
import AlbumHeader from "../Components/AlbumHeader";
import { getSongsByIds } from "../app/features/songSlice";
import { getAlbumById, getAlbumFromApi } from "../app/features/albumsSlice";
import Spinner from "../Components/Spinner";

type AlbumParams = {
  id: string;
};

function Album() {
  const { id } = useParams<AlbumParams>();
  const dispatch = useAppDispatch();

  const auth = useAppSelector(selectAuth);
  const album = useAppSelector((state) => getAlbumById(state, id));
  const songs = useAppSelector((state) =>
    getSongsByIds(state, album.tracks || [])
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading && !album?.tracks) {
      dispatch(getAlbumFromApi({ id, ...auth }));
      setLoading(true);
    }
  }, [album, auth, dispatch, id, loading]);

  return (
    <div className={`flex flex-auto flex-col lg:flex-row gap-6`}>
      <AlbumHeader album={album} />
      {!album?.tracks ? <Spinner /> : <TrackList tracks={songs} />}
    </div>
  );
}

export default Album;
