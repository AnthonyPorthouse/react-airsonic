import type { SongIds, Songs } from "@api/types.js";
import { useTrackList } from "@hooks/useTrackList.js";
import { Link } from "@tanstack/react-router";
import { Play, Shuffle } from "lucide-react";
import { SyntheticEvent, memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import AlbumArt from "./AlbumArt.js";
import Button from "./Button.js";

interface Playable {
  id: string;
  coverArt?: string;
  name: string;
  tracks: SongIds;
  artist?: string;
  artistId?: string;
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
        {useMemo(
          () => (
            <AlbumArt id={album.coverArt} description={album.name} />
          ),
          [album],
        )}
        <div className={`col-span-2 lg:col-span-1`}>
          <h1 className={`text-2xl lg:text-3xl`}>{album.name}</h1>
          <h2 className={`text-xl`}>
            {album.artistId ? (
              <Link
                to="/artists/$artistId"
                params={{ artistId: album.artistId ?? "" }}
              >
                {album.artist}
              </Link>
            ) : (
              album.artist
            )}
          </h2>
          <h3>{album.year}</h3>
          <div className="flex flex-col gap-2">
            <Button
              renderIcon={useCallback(
                () => (
                  <Play className="w-6 fill-black" />
                ),
                [],
              )}
              onClick={playAll}
            >
              <span className="flex-grow">{t("playAll")}</span>
            </Button>

            <Button
              renderIcon={() => <Shuffle className="w-6" />}
              onClick={shuffleAll}
            >
              <span className="flex-grow">{t("shuffleAll")}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AlbumHeader);
