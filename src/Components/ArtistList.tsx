import { Artists } from "../api/artists.js";
import ArtistItem from "./ArtistItem.js";
import Grid from "./Grid.js";

interface ArtistListProps {
  className?: string;
  artists: Artists;
}

function ArtistList({ className, artists }: Readonly<ArtistListProps>) {
  return (
    <Grid className={className}>
      {artists.map((artist) => (
        <ArtistItem key={artist.id} artist={artist} />
      ))}
    </Grid>
  );
}

export default ArtistList;
