import type { Artists } from "@api/types.js";
import { Fragment, useMemo } from "react";
import slugify from "slugify";

import ArtistItem from "./ArtistItem.js";
import Grid from "./Grid.js";

interface ArtistListProps {
  className?: string;
  artists: Artists;
}

function ArtistList({ className, artists }: Readonly<ArtistListProps>) {
  const artistsByLetter = useMemo(() => {
    return artists.reduce((prev: { [key: string]: Artists }, artist) => {
      let key = slugify(artist.name).charAt(0).toUpperCase();

      if (Number.isInteger(key)) {
        key = "#";
      }

      if (!prev[key]) {
        prev[key] = [];
      }

      prev[key] = [...prev[key], artist];

      return prev;
    }, {});
  }, [artists]);

  const sortedKeys = useMemo(
    () => Object.keys(artistsByLetter).sort((a, b) => a.localeCompare(b)),
    [artistsByLetter],
  );

  return sortedKeys.map((key) => {
    const artists = artistsByLetter[key];

    return (
      <Fragment key={key}>
        <h2 className={`my-4 mb-1 text-2xl`}>{key}</h2>
        <Grid className={className}>
          {artists.map((artist) => (
            <ArtistItem key={artist.id} artist={artist} />
          ))}
        </Grid>
      </Fragment>
    );
  });
}

export default ArtistList;
