import { Link } from "react-router-dom";

import type { Podcast as ApiPodcast } from "../api/podcasts";
import AlbumArt from "./AlbumArt";

interface PodcastProps {
  podcast: ApiPodcast;
}

function Podcast({ podcast }: PodcastProps) {
  const { id, title, coverArt } = podcast;

  return (
    <Link
      to={`/podcasts/${id}`}
      className={`block w-full relative rounded overflow-hidden hover:shadow-lg`}
    >
      <AlbumArt id={coverArt} description={title} />
      <div
        className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ease-in-out bg-white/75 opacity-0 hover:opacity-100 p-1 flex flex-col justify-center text-center`}
      >
        <h1 className={`text-xl`}>{title}</h1>
      </div>
    </Link>
  );
}

export default Podcast;
