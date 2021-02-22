import React, { useEffect, useState } from "react";
import ArtistList from "../Components/ArtistList";
import { useDispatch, useSelector } from "react-redux";
import {
  getArtistsFromApi,
  areArtistsLoaded,
  getArtistsAlphabetically,
} from "../features/artistsSlice";
import { selectAuth } from "../features/authSlice";

function Artists() {
  const dispatch = useDispatch();
  const artistsLoaded = useSelector(areArtistsLoaded);
  const artists = useSelector(getArtistsAlphabetically);
  const auth = useSelector(selectAuth);

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
