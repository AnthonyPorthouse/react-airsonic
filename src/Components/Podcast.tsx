import { Link } from "react-router-dom";

import type { Podcast as ApiPodcast } from "../api/podcasts.js";
import HoverableAlbumArt from "./HoverableAlbumArt.js";

interface PodcastProps {
  podcast: ApiPodcast;
}

function Podcast({ podcast }: Readonly<PodcastProps>) {
  const { id, title, coverArt } = podcast;

  return (
    <Link to={`/podcasts/${id}`}>
      <HoverableAlbumArt coverArt={coverArt} artDescription={title}>
        <h1 className={`text-xl`}>{title}</h1>
      </HoverableAlbumArt>
    </Link>
  );
}

export default Podcast;
