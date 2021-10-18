import { useEffect, useState } from "react";
import ArtistList from "../Components/ArtistList";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getArtistsFromApi,
  areArtistsLoaded,
  getArtistsAlphabetically,
} from "../features/artistsSlice";
import { selectAuth } from "../features/authSlice";

function Artists() {
  const dispatch = useAppDispatch();
  const artistsLoaded = useAppSelector(areArtistsLoaded);
  const artists = useAppSelector(getArtistsAlphabetically);
  const auth = useAppSelector(selectAuth);

  const [loading, setLoading] = useState(false);

  const fetchAlbums = !loading && !artistsLoaded;

  useEffect(() => {
    if (fetchAlbums) {
      dispatch(getArtistsFromApi(auth));
      setLoading(true);
    }
  }, [fetchAlbums, dispatch, auth]);

  return (
    <div>
      <h1 className={`text-2xl`}>All Artists</h1>

      <ArtistList artists={artists} />
    </div>
  );
}

export default Artists;
