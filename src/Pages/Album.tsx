import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import AlbumHeader from "../Components/AlbumHeader.js";
import Spinner from "../Components/Spinner.js";
import TrackList from "../Components/TrackList.js";
import { getAlbum } from "../api/albums.js";
import { useAuth } from "../api/auth.js";

type AlbumParams = {
  id: string;
};

function Album() {
  const id: string = useParams<AlbumParams>()["id"] || "";

  const auth = useAuth();

  const { isSuccess, data } = useQuery({
    queryKey: ["albums", id],
    queryFn: () => getAlbum(id, auth.credentials),
    enabled: auth.isAuthenticated,
  });

  if (isSuccess) {
    const [album, songs] = data;

    return (
      <div className={`flex flex-auto flex-col lg:flex-row gap-6`}>
        <AlbumHeader album={album} tracks={songs} />
        <TrackList tracks={songs} />
      </div>
    );
  }

  return (
    <div className={`flex flex-auto flex-col lg:flex-row gap-6`}>
      <Spinner />
    </div>
  );
}

export default Album;
