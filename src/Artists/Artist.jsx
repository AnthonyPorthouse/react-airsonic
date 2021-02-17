import React, {useState} from "react";
import AlbumArt from "./AlbumArt";

function Artist({artist}) {
    const [id] = useState(artist.id);
    const [name] = useState(artist.name);
    const [coverArt] = useState(artist.coverArt);
    const [albumCount] = useState(artist.albumCount);

    return (
        <div>
            <h1>{name} (id: {id})</h1>
            <AlbumArt id={coverArt} description={name} />
        </div>
    );
}

export default Artist;
