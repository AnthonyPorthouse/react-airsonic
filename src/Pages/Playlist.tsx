import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import AlbumHeader from "../Components/AlbumHeader.js";
import Spinner from "../Components/Spinner.js";
import TrackList from "../Components/TrackList.js";
import { useAuth } from "../api/auth.js";
import { getPlaylist } from "../api/playlists.js";

type PlaylistParams = {
  id: string;
};

function Playlist() {
  const id = useParams<PlaylistParams>()["id"] || "";
  const auth = useAuth();

  const { isSuccess, data } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => getPlaylist(id, auth.credentials),
    enabled: auth.isAuthenticated,
  });

  if (isSuccess) {
    const [playlist, songs] = data;
    return (
      <div className={`flex flex-auto flex-col lg:flex-row gap-6`}>
        <AlbumHeader album={playlist} tracks={songs} />
        {<TrackList tracks={songs} />}
      </div>
    );
  }

  return (
    <div>
      <Spinner />
    </div>
  );
}
export default Playlist;
