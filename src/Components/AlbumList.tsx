import { lazy, Suspense } from "react";
import { Album } from "../features/api";

const AlbumView = lazy(() => import("./Album"));
const Grid = lazy(() => import("./Grid"));

interface AlbumListProps {
  className?: string;
  albums: Album[];
}

function AlbumList({ className, albums }: AlbumListProps) {
  return (
    <Suspense fallback={null}>
      <Grid className={className}>
        {albums.map((album) => (
          <AlbumView key={album.id} album={album} />
        ))}
      </Grid>
    </Suspense>
  );
}

export default AlbumList;
