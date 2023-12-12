import type { Podcast } from "../api/podcasts.js";
import AlbumArt from "./AlbumArt.js";

interface PodcastHeaderProps {
  podcast: Podcast;
}

function AlbumHeader({ podcast }: PodcastHeaderProps) {
  return (
    <section className={`flex flex-col gap-6`}>
      <div className={`grid grid-cols-3 lg:grid-cols-1 gap-6 w-full lg:w-64`}>
        <AlbumArt id={podcast.coverArt} description={podcast.title} />
        <div className={`col-span-2 lg:col-span-1`}>
          <h1 className={`text-2xl lg:text-3xl`}>{podcast.title}</h1>
          <p>{podcast.description}</p>
        </div>
      </div>
    </section>
  );
}

export default AlbumHeader;
