import React from "react";
import AlbumArt from "./AlbumArt";
import {Link} from "react-router-dom";

function ArtistItem({artist}) {
    const {id, name, coverArt} = artist;

    return (
        <Link to={`/artist/${id}`} className={`block`}>
            <h1>{name} (id: {id})</h1>
            <AlbumArt id={coverArt} description={name} />
        </Link>
    );
}

export default ArtistItem;
