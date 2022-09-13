import React from "react";
import ArtistItem from "./ArtistItem";
import Grid from "./Grid";
import { Artists } from "../api/artists";

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
