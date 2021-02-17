import React from "react";
import AlbumArt from "./AlbumArt";

function ArtistItem({artist}) {
    const {id, name, coverArt} = artist;

    const viewArtist = (e) => {
        e.preventDefault();
    };

    return (
        <button className={`block`} onClick={viewArtist}>
            <h1>{name} (id: {id})</h1>
            <AlbumArt id={coverArt} description={name} />
        </button>
    );
}

export default ArtistItem;
