import React from "react";
import ArtistItem from "./ArtistItem";
import Grid from "./Grid";

function ArtistList({ artists }) {
  return (
    <Grid>
      {artists.map((artist) => (
        <ArtistItem key={artist.id} artist={artist} />
      ))}
    </Grid>
  );
}

export default ArtistList;
