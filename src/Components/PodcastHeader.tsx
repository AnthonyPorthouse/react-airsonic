import type { Podcast } from "@api/types.js";

import AlbumArt from "./AlbumArt.js";

interface PodcastHeaderProps {
  podcast: Podcast;
}

function PodcastHeader({ podcast }: Readonly<PodcastHeaderProps>) {
  return (
    <section className={`flex flex-col gap-6`}>
      <div className={`grid w-full grid-cols-3 gap-6 lg:w-64 lg:grid-cols-1`}>
        <AlbumArt id={podcast.coverArt} description={podcast.title} />
        <div className={`col-span-2 lg:col-span-1`}>
          <h1 className={`text-2xl lg:text-3xl`}>{podcast.title}</h1>
          <p>{podcast.description}</p>
        </div>
      </div>
    </section>
  );
}

export default PodcastHeader;
