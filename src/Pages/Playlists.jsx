import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  arePlaylistsLoaded,
  getAllPlaylists,
  getPlaylistsFromApi,
} from "../app/features/playlistsSlice";
import { selectAuth } from "../app/features/authSlice";
import Grid from "../Components/Grid";
import Playlist from "../Components/Playlist";

function Playlists() {
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const playlistsLoaded = useSelector(arePlaylistsLoaded);
  const playlists = useSelector(getAllPlaylists);

  const [loading, setLoading] = useState(false);

  const fetchPlaylists = !loading && !playlistsLoaded;

  useEffect(() => {
    if (fetchPlaylists) {
      dispatch(getPlaylistsFromApi(auth));
      setLoading(true);
    }
  }, [auth, dispatch, fetchPlaylists]);

  return (
    <div>
      <Grid>
        {playlists.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} />
        ))}
      </Grid>
    </div>
  );
}

export default Playlists;
