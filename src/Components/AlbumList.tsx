import { Albums } from "@api/albums.js";

import Album from "./Album.js";
import Grid from "./Grid.js";

interface AlbumListProps {
  className?: string;
  albums: Albums;
}

function AlbumList({ className, albums }: Readonly<AlbumListProps>) {
  return (
    <Grid className={className}>
      {albums.map((album, i) => (
        <Album key={album.id} album={album} lazyLoad={i >= 8} />
      ))}
    </Grid>
  );
}

export default AlbumList;
