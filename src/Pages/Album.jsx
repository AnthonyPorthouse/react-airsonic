import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import { useEffect, useState } from "react";
import TrackList from "../Components/TrackList";
import AlbumHeader from "../Components/AlbumHeader";
import { getSongsByIds } from "../features/songSlice";
import { getAlbumById, getAlbumFromApi } from "../features/albumsSlice";

function Album() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const album = useSelector((state) => getAlbumById(state, id));
  const songs = useSelector((state) =>
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
      {<TrackList tracks={songs} />}
    </div>
  );
}

export default Album;
