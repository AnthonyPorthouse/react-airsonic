import AlbumArt from "./AlbumArt";

function Album({album}) {
    const {id, name, year, coverArt} = album;

    return <div className={`w-64`}>
        <AlbumArt id={coverArt} description={name} />
        <h1>{name} ({year})</h1>
    </div>;
}

export default Album
