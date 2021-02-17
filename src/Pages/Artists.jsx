import React, {useEffect} from 'react'
import ArtistList from "../Components/ArtistList";
import {useDispatch, useSelector} from "react-redux";
import {getArtists, selectArtists, selectArtistsLoaded} from "../features/artistsSlice";
import {selectAuth} from "../features/authSlice";

function Artists() {
    const dispatch = useDispatch();
    const artistsLoaded = useSelector(selectArtistsLoaded)
    const artists = useSelector(selectArtists);
    const auth = useSelector(selectAuth);

    useEffect(() => {
        if (!artistsLoaded) {
            dispatch(getArtists(auth));
        }

    }, [artistsLoaded, dispatch, auth])

    return <div>
        <h1 className={`text-2xl`}>All Artists</h1>

        <ArtistList artists={artists} />
    </div>
}

export default Artists;
