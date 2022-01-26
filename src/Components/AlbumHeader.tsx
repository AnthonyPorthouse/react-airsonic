import AlbumArt from "./AlbumArt";
import { getNextTrack, setTracks } from "../app/features/playlistSlice";
import { useAppDispatch } from "../app/hooks";
import { SongIds } from "../app/features/api";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

interface Playable {
  id: string;
  coverArt: string;
  name: string;
  tracks: SongIds;
  artist?: string;
  year?: number;
}

interface AlbumHeaderProps {
  album: Playable;
}

function AlbumHeader({ album }: AlbumHeaderProps) {
  const { t } = useTranslation("albums");

  const dispatch = useAppDispatch();

  const playAll = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setTracks(album.tracks));
    dispatch(getNextTrack());
  };

  const shuffleAll = (e: SyntheticEvent) => {
    e.preventDefault();

    let tracks = album.tracks.slice();

    const shuffle = (array: SongIds) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    };

    dispatch(setTracks(shuffle(tracks)));
    dispatch(getNextTrack());
  };

  return (
    <section className={`flex flex-col gap-6`}>
      <div className={`grid grid-cols-3 lg:grid-cols-1 gap-6 w-full lg:w-64`}>
        <AlbumArt id={album.coverArt} description={album.name} />
        <div className={`col-span-2 lg:col-span-1`}>
          <h1 className={`text-2xl lg:text-3xl`}>{album.name}</h1>
          <h2 className={`text-xl`}>{album.artist}</h2>
          <h3>{album.year}</h3>
          <button className={`w-full`} onClick={playAll}>
            {t("playAll")}
          </button>
          <button className={`w-full`} onClick={shuffleAll}>
            {t("shuffleAll")}
          </button>
        </div>
      </div>
    </section>
  );
}

export default AlbumHeader;
