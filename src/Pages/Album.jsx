import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import { getAlbum, selectAlbum, selectTracks } from "../features/albumSlice";
import { useEffect, useState } from "react";
import TrackList from "../Components/TrackList";
import AlbumHeader from "../Components/AlbumHeader";

function Album() {
  const { id } = useParams();

  const auth = useSelector(selectAuth);
  const album = useSelector(selectAlbum);
  const tracks = useSelector(selectTracks);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading && id !== album.id) {
      dispatch(getAlbum({ id, ...auth }));
      setLoading(true);
    }
  }, [album, auth, dispatch, id, loading]);

  return (
    <div className={`flex flex-auto gap-6`}>
      <AlbumHeader album={album} tracks={tracks} />
      <TrackList tracks={tracks} />
    </div>
  );
}

export default Album;
