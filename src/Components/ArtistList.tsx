import React from "react";
import { Artist } from "../app/features/api";
import ArtistItem from "./ArtistItem";
import Grid from "./Grid";

interface ArtistListProps {
  className?: string;
  artists: Artist[];
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
