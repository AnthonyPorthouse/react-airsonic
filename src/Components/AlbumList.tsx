import { Suspense, lazy } from "react";

import { Album } from "../api/albums.js";

const AlbumView = lazy(() => import("./Album.js"));
const Grid = lazy(() => import("./Grid.js"));

interface AlbumListProps {
  className?: string;
  albums: Album[];
}

function AlbumList({ className, albums }: Readonly<AlbumListProps>) {
  return (
    <Suspense fallback={null}>
      <Grid className={className}>
        {albums.map((album, i) => (
          <AlbumView key={album.id} album={album} lazyLoad={i >= 8} />
        ))}
      </Grid>
    </Suspense>
  );
}

export default AlbumList;
