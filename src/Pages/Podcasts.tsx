import { useQuery } from "@tanstack/react-query";

import ArtistList from "../Components/ArtistList";
import PodcastList from "../Components/PodcastList";
import Spinner from "../Components/Spinner";
import { getArtists } from "../api/artists";
import { useAuth } from "../api/auth";
import { getPodcasts } from "../api/podcasts";

function Podcasts() {
  const auth = useAuth();

  const { isSuccess, data } = useQuery(
    ["podcasts"],
    () => getPodcasts(auth.credentials),
    {
      enabled: auth.isAuthenticated,
    }
  );

  if (isSuccess) {
    return (
      <div>
        <h1 className={`text-2xl`}>Podcasts</h1>

        <div>
          <PodcastList podcasts={data} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Spinner />
    </div>
  );
}

export default Podcasts;
