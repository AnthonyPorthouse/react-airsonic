import ArtistList from "../Components/ArtistList";
import React from "react";
import AlbumList from "../Components/AlbumList";
import TrackList from "../Components/TrackList";
import { useSelector } from "react-redux";
import { getArtistsByIds } from "../app/features/artistsSlice";
import { getResults } from "../app/features/searchSlice";
import { getAlbumsByIds } from "../app/features/albumsSlice";
import { getSongsByIds } from "../app/features/songSlice";

function Search() {
  const results = useSelector(getResults);

  const artists = useSelector((state) =>
    getArtistsByIds(state, results.artists)
  );
  const albums = useSelector((state) => getAlbumsByIds(state, results.albums));
  const songs = useSelector((state) => getSongsByIds(state, results.songs));

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
      {artists.length ? (
        <div className={``}>
          <h1 className={`text-xl`}>Artists</h1>
          <ArtistList
            className={`grid-cols-2 md:grid-cols-4`}
            artists={artists}
          />
        </div>
      ) : null}

      {albums.length ? (
        <div className={``}>
          <h1 className={`text-xl`}>Albums</h1>
          <AlbumList className={`grid-cols-2 md:grid-cols-4`} albums={albums} />
        </div>
      ) : null}

      <div className={`md:col-span-2`}>
        <TrackList tracks={songs} />
      </div>
    </div>
  );
}

export default Search;
