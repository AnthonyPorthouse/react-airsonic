import type { Albums } from "@api/types.js";

import Album from "./Album.js";
import List from "./List.js";

interface AlbumListProps {
  className?: string;
  albums: Albums;
}

function AlbumList({ className, albums }: Readonly<AlbumListProps>) {
  return (
    <List className={className}>
      {albums.map((album, i) => (
        <Album key={album.id} album={album} lazyLoad={i >= 8} />
      ))}
    </List>
  );
}

export default AlbumList;
