import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {
    getArtist,
    selectCurrentArtist,
    selectCurrentArtistAlbums,
} from "../features/artistSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../features/authSlice";
import AlbumList from "../Components/AlbumList";

function Artist() {
    const {id} = useParams();

    const auth = useSelector(selectAuth)
    const artist = useSelector(selectCurrentArtist)
    const albums = useSelector(selectCurrentArtistAlbums)

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!loading && id !== artist.id) {
            dispatch(getArtist({id, ...auth}))
            setLoading(true)
        }
    }, [artist, auth, dispatch, id, loading])

    return <div>
        <h1 className={`text-2xl`}>{artist.name}</h1>

        <AlbumList albums={albums}/>
    </div>
}

export default Artist;
