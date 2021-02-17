import Album from "./Album";

function AlbumList({albums}) {
    return (
        <div>
            {albums.map((album) => <Album key={album.id} album={album} />)}
        </div>
    )
}

export default AlbumList;
