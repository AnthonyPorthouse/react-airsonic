import AlbumArt from "../Artists/AlbumArt";

function Album({album}) {
    const {id, name, year, coverArt} = album;

    return <div>
        <h1>{name} ({year})</h1>
        <AlbumArt id={coverArt} description={name} />
    </div>;
}

export default Album
