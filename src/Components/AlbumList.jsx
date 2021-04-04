import { lazy, Suspense } from "react";

const Album = lazy(() => import("./Album"));
const Grid = lazy(() => import("./Grid"));

function AlbumList({ className, albums }) {
  return (
    <Suspense fallback={<div />}>
      <Grid className={className}>
        {albums.map((album) => (
          <Album key={album.id} album={album} />
        ))}
      </Grid>
    </Suspense>
  );
}

export default AlbumList;
