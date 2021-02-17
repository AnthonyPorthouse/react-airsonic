import Album from "./Album";
import Grid from "./Grid";

function AlbumList({ albums }) {
  return (
    <Grid>
      {albums.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </Grid>
  );
}

export default AlbumList;
