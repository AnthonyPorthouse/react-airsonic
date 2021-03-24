import React from "react";
import ArtistItem from "./ArtistItem";
import Grid from "./Grid";

function ArtistList({ className, artists }) {
  return (
    <Grid className={className}>
      {artists.map((artist) => (
        <ArtistItem key={artist.id} artist={artist} />
      ))}
    </Grid>
  );
}

export default ArtistList;
