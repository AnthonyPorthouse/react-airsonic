import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import AlbumList from "../Components/AlbumList";
import { getArtist } from "../api/artists";
import { useAuth } from "../api/auth";

type ArtistParams = {
  id: string;
};

function Artist() {
  const id = useParams<ArtistParams>()["id"] || "";
  const auth = useAuth();

  const { isSuccess, data } = useQuery(
    ["artist", id],
    () => getArtist(id, auth.credentials),
    {
      enabled: auth.isAuthenticated,
    }
  );

  if (isSuccess) {
    const [artist, albums] = data;

    return (
      <div>
        <h1 className={`text-2xl`}>{artist.name}</h1>

        <AlbumList albums={albums} />
      </div>
    );
  }

  return <div></div>;
}

export default Artist;
