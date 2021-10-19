import { useEffect, useState } from "react";
import {
  arePlaylistsLoaded,
  getAllPlaylists,
  getPlaylistsFromApi,
} from "../app/features/playlistsSlice";
import { selectAuth } from "../app/features/authSlice";
import Grid from "../Components/Grid";
import Playlist from "../Components/Playlist";
import {useAppDispatch, useAppSelector} from "../app/hooks";

function Playlists() {
  const dispatch = useAppDispatch();

  const auth = useAppSelector(selectAuth);
  const playlistsLoaded = useAppSelector(arePlaylistsLoaded);
  const playlists = useAppSelector(getAllPlaylists);

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
