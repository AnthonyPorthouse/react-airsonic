import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import {
  getPlaylistById,
  getPlaylistFromApi,
} from "../features/playlistsSlice";
import { useEffect, useState } from "react";
import AlbumHeader from "../Components/AlbumHeader";
import TrackList from "../Components/TrackList";
import { getSongsByIds } from "../features/songSlice";

function Playlist() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const playlist = useSelector((state) => getPlaylistById(state, id));
  const songs = useSelector((state) =>
    getSongsByIds(state, playlist.tracks || [])
  );

  const [loading, setLoading] = useState(false);

  const playlistNeedsLoaded = !loading && !playlist?.tracks;

  useEffect(() => {
    if (playlistNeedsLoaded) {
      dispatch(getPlaylistFromApi({ id, ...auth }));
      setLoading(true);
    }
  }, [auth, dispatch, id, playlistNeedsLoaded]);

  return (
    <div className={`flex flex-auto flex-col lg:flex-row gap-6`}>
      <AlbumHeader album={playlist} />
      {<TrackList tracks={songs} />}
    </div>
  );
}
export default Playlist;
