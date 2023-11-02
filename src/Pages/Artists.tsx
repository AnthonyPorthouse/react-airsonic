import { useQuery } from "@tanstack/react-query";

import ArtistList from "../Components/ArtistList";
import Spinner from "../Components/Spinner";
import { getArtists } from "../api/artists";
import { useAuth } from "../api/auth";

function Artists() {
  const auth = useAuth();

  const { isSuccess, data } = useQuery({
    queryKey: ["artists"],
    queryFn: () => getArtists(auth.credentials),
    enabled: auth.isAuthenticated,
  });

  if (isSuccess) {
    return (
      <div>
        <h1 className={`text-2xl`}>All Artists</h1>

        <ArtistList artists={data} />
      </div>
    );
  }

  return (
    <div>
      <Spinner />
    </div>
  );
}

export default Artists;
