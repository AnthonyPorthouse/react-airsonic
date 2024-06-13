import type { Podcast as ApiPodcast } from "@api/podcasts.js";
import { Link } from "@tanstack/react-router";

import HoverableAlbumArt from "./HoverableAlbumArt.js";

interface PodcastProps {
  podcast: ApiPodcast;
}

function Podcast({ podcast }: Readonly<PodcastProps>) {
  const { id, title, coverArt } = podcast;

  return (
    <Link to={`/podcasts/$podcastId`} params={{ podcastId: id }}>
      <HoverableAlbumArt coverArt={coverArt} artDescription={title}>
        <h1 className={`text-xl`}>{title}</h1>
      </HoverableAlbumArt>
    </Link>
  );
}

export default Podcast;
