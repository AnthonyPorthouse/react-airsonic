import React from "react";
import AlbumArt from "./AlbumArt";
import {Link} from "react-router-dom";

function ArtistItem({artist}) {
    const {id, name, coverArt} = artist;

    return (
        <Link to={`/artist/${id}`} className={`block`}>
            <AlbumArt id={coverArt} description={name} />
            <h1>{name} (id: {id})</h1>
        </Link>
    );
}

export default ArtistItem;
