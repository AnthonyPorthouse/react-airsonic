import React, {useEffect} from 'react';
import ArtistItem from "./ArtistItem";
import {useDispatch, useSelector} from "react-redux";
import {getArtists, selectArtists, selectArtistsLoaded} from "../features/artistSlice";
import {selectAuth} from "../features/authSlice";

function ArtistList() {
    const dispatch = useDispatch();
    const artistsLoaded = useSelector(selectArtistsLoaded)
    const artists = useSelector(selectArtists);
    const auth = useSelector(selectAuth);

    useEffect(() => {
        if (!artistsLoaded) {
            dispatch(getArtists(auth));
        }

    }, [artistsLoaded, dispatch, auth])

    return (
        <div className={`flex gap-6`}>
            {artists.map((artist) => <ArtistItem key={artist.id} artist={artist} />)}
        </div>
    )
}

export default ArtistList;
