import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import { getScaledCoverArtUrl } from "../features/api";

function AlbumArt({ id, description }) {
  const auth = useSelector(selectAuth);

  const url = getScaledCoverArtUrl({ id, size: 64, ...auth });
  return (
    <picture className={`rounded overflow-hidden w-full`}>
      <source
        srcSet={`${getScaledCoverArtUrl({ id, size: 256, ...auth })} 256w`}
      />
      <source
        srcSet={`${getScaledCoverArtUrl({ id, size: 128, ...auth })} 128w`}
      />

      <img src={url} alt={description} loading="lazy" />
    </picture>
  );
}

export default AlbumArt;
