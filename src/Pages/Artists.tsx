import ArtistList from "../Components/ArtistList";
import { useAuth } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { getArtists } from "../api/artists";
import Spinner from "../Components/Spinner";

function Artists() {
  const auth = useAuth();

  const { isSuccess, data } = useQuery(
    ["artists"],
    () => getArtists(auth.credentials),
    {
      enabled: auth.isAuthenticated,
    }
  );

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
