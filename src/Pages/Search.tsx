import ArtistList from "../Components/ArtistList";
import AlbumList from "../Components/AlbumList";
import TrackList from "../Components/TrackList";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSearchResults } from "../api/search";
import { useAuth } from "../api/auth";
import Spinner from "../Components/Spinner";

function Search() {
  const [params] = useSearchParams();
  const query = params.get("query") || "";
  const auth = useAuth();

  const { isSuccess, data } = useQuery(
    ["search", query],
    () => getSearchResults(query, auth.credentials),
    {
      enabled: auth.isAuthenticated,
    }
  );

  if (!isSuccess) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const [artists, albums, songs] = data;

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
