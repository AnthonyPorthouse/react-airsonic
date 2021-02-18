import AlbumArt from "./AlbumArt";

function AlbumHeader({ album }) {
  return (
    <div className={`flex flex-col gap-6 w-64`}>
      <AlbumArt id={album.coverArt} description={album.name} />
      <div className={`flex-auto`}>
        <h1 className={`text-3xl`}>{album.name}</h1>
        <h2 className={`text-xl`}>{album.artist}</h2>
        <h3>{album.year}</h3>
      </div>
    </div>
  );
}

export default AlbumHeader;
