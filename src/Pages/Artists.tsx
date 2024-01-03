import { useQuery } from "@tanstack/react-query";

import ArtistList from "../Components/ArtistList.js";
import Spinner from "../Components/Spinner.js";
import { useAuth } from "../Providers/AuthProvider.js";
import { getArtists } from "../api/artists.js";

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
