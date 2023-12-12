import { useQuery } from "@tanstack/react-query";

import PodcastList from "../Components/PodcastList.js";
import Spinner from "../Components/Spinner.js";
import { useAuth } from "../api/auth.js";
import { getPodcasts } from "../api/podcasts.js";

function Podcasts() {
  const auth = useAuth();

  const { isSuccess, data } = useQuery({
    queryKey: ["podcasts"],
    queryFn: () => getPodcasts(auth.credentials),
    enabled: auth.isAuthenticated,
  });

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
