import React from "react";
import {useSelector} from "react-redux";
import {selectPassword, selectServer, selectUsername} from "../features/authSlice";
import {getCoverArtUrl} from '../features/api';

function AlbumArt({id, description}) {
    const server = useSelector(selectServer);
    const username = useSelector(selectUsername);
    const password = useSelector(selectPassword);

    const url = getCoverArtUrl(id, server, username, password);
    return (
        <div className={`rounded overflow-hidden`}>
            <img className={`w-64 h-64`} src={url} alt={description} loading="lazy"/>
        </div>
    )
}

export default AlbumArt
