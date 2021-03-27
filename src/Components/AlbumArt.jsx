import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import { getScaledCoverArtUrl } from "../features/api";

function AlbumArt({ id, description }) {
  const auth = useSelector(selectAuth);

  return (
    <picture className={`rounded overflow-hidden w-full`}>
      <source
        srcSet={`${getScaledCoverArtUrl({
          id,
          size: 256,
          ...auth,
        })} 1x, ${getScaledCoverArtUrl({
          id,
          size: 512,
          ...auth,
        })} 2x`}
      />

      <img
        src={getScaledCoverArtUrl({ id, size: 64, ...auth })}
        alt={description}
        loading="lazy"
      />
    </picture>
  );
}

export default AlbumArt;
