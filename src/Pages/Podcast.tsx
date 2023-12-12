import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import EpisodeList from "../Components/EpisodeList.js";
import PodcastHeader from "../Components/PodcastHeader.js";
import Spinner from "../Components/Spinner.js";
import { useAuth } from "../api/auth.js";
import { getPodcast } from "../api/podcasts.js";

type PodcastParams = {
  id: string;
};

function Podcast() {
  const id: string = useParams<PodcastParams>()["id"] || "";

  const auth = useAuth();

  const { isSuccess, data } = useQuery({
    queryKey: ["podcasts", id],
    queryFn: () => getPodcast(id, auth.credentials),

    enabled: auth.isAuthenticated,
  });

  if (isSuccess) {
    const [podcast, episodes] = data;

    return (
      <div className={`flex flex-auto flex-col lg:flex-row gap-6`}>
        <PodcastHeader podcast={podcast} />
        <EpisodeList episodes={episodes} />
      </div>
    );
  }

  return (
    <div className={`flex flex-auto flex-col lg:flex-row gap-6`}>
      <Spinner />
    </div>
  );
}

export default Podcast;
