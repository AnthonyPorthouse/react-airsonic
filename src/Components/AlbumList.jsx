import Album from "./Album";
import Grid from "./Grid";

function AlbumList({ className, albums }) {
  return (
    <Grid className={className}>
      {albums.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </Grid>
  );
}

export default AlbumList;
