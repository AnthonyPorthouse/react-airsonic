import { ArrowsRightLeftIcon, PlayIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

import { useTrackList } from "../Providers/TrackListProvider.js";
import { SongIds, Songs } from "../api/songs.js";
import AlbumArt from "./AlbumArt.js";

interface Playable {
  id: string;
  coverArt?: string;
  name: string;
  tracks: SongIds;
  artist?: string;
  year?: number;
}

interface AlbumHeaderProps {
  album: Playable;
  tracks: Songs;
}

function AlbumHeader({ album, tracks }: Readonly<AlbumHeaderProps>) {
  const { t } = useTranslation("albums");

  const { setTrackList } = useTrackList();

  const playAll = (e: SyntheticEvent) => {
    e.preventDefault();
    setTrackList(tracks);
  };

  const shuffleAll = (e: SyntheticEvent) => {
    e.preventDefault();

    const shuffle = (songs: Songs) => {
      const array = Array.from(songs);

      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    };

    setTrackList(shuffle(tracks));
  };

  return (
    <section className={`flex flex-col gap-6`}>
      <div className={`grid w-full grid-cols-3 gap-6 lg:w-64 lg:grid-cols-1`}>
        <AlbumArt id={album.coverArt} description={album.name} />
        <div className={`col-span-2 lg:col-span-1`}>
          <h1 className={`text-2xl lg:text-3xl`}>{album.name}</h1>
          <h2 className={`text-xl`}>{album.artist}</h2>
          <h3>{album.year}</h3>
          <div className="flex flex-col gap-2">
            <button
              className={`flex w-full flex-row items-center rounded-full border border-gray-200 px-2 py-1 text-lg shadow-sm active:shadow-inner`}
              onClick={playAll}
            >
              <PlayIcon className={`w-6`} />
              <span className="flex-grow">{t("playAll")}</span>
            </button>
            <button
              className={`flex w-full flex-row items-center rounded-full border border-gray-200 px-2 py-1 text-lg shadow-sm active:shadow-inner`}
              onClick={shuffleAll}
            >
              <ArrowsRightLeftIcon className="w-6" />
              <span className="flex-grow">{t("shuffleAll")}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AlbumHeader;
