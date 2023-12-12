import { useQuery } from "@tanstack/react-query";

import Grid from "../Components/Grid.js";
import Playlist from "../Components/Playlist.js";
import Spinner from "../Components/Spinner.js";
import { useAuth } from "../api/auth.js";
import { getPlaylists } from "../api/playlists.js";

function Playlists() {
  const auth = useAuth();

  const { isSuccess, data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => getPlaylists(auth.credentials),
    enabled: auth.isAuthenticated,
  });

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
