import { useTranslation } from "react-i18next";

import type { Podcast } from "../api/podcasts";
import AlbumArt from "./AlbumArt";

interface PodcastHeaderProps {
  podcast: Podcast;
}

function AlbumHeader({ podcast }: PodcastHeaderProps) {
  const { t } = useTranslation("podcasts");

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
