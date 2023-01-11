import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import EpisodeList from "../Components/EpisodeList";
import PodcastHeader from "../Components/PodcastHeader";
import Spinner from "../Components/Spinner";
import { useAuth } from "../api/auth";
import { getPodcast } from "../api/podcasts";

type PodcastParams = {
  id: string;
};

function Podcast() {
  const id: string = useParams<PodcastParams>()["id"] || "";

  const auth = useAuth();

  const { isSuccess, data } = useQuery(
    ["podcasts", id],
    () => getPodcast(id, auth.credentials),
    {
      enabled: auth.isAuthenticated,
    }
  );

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
