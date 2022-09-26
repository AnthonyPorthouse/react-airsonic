import React from "react";

import { Artists } from "../api/artists";
import ArtistItem from "./ArtistItem";
import Grid from "./Grid";

interface ArtistListProps {
  className?: string;
  artists: Artists;
}

function ArtistList({ className, artists }: ArtistListProps) {
  return (
    <Grid className={className}>
      {artists.map((artist) => (
        <ArtistItem key={artist.id} artist={artist} />
      ))}
    </Grid>
  );
}

export default ArtistList;
