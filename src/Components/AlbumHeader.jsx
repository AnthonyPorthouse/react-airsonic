import AlbumArt from "./AlbumArt";

function AlbumHeader({ album }) {
  return (
    <div className={`flex gap-6`}>
      <AlbumArt id={album.coverArt} description={album.title} />
      <div className={`flex-auto`}>
        <h1 className={`text-3xl`}>{album.name}</h1>
        <h2 className={`text-xl`}>{album.artist}</h2>
        <h3>{album.year}</h3>
      </div>
    </div>
  );
}

export default AlbumHeader;
