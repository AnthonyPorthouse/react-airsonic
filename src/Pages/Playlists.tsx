import Grid from "../Components/Grid";
import Playlist from "../Components/Playlist";
import { useAuth } from "../api/auth";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../Components/Spinner";
import { getPlaylists } from "../api/playlists";

function Playlists() {
  const auth = useAuth();

  const { isSuccess, data: playlists } = useQuery(
    ["playlists"],
    () => getPlaylists(auth.credentials),
    {
      enabled: auth.isAuthenticated,
    }
  );

  if (isSuccess) {
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

  return (
    <div>
      <Spinner />
    </div>
  );
}

export default Playlists;
