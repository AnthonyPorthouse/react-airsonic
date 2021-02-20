import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import { getCoverArtUrl } from "../features/api";

function AlbumArt({ id, description }) {
  const auth = useSelector(selectAuth);

  const url = getCoverArtUrl({ id, ...auth });
  return (
    <img
      className={`rounded overflow-hidden w-full`}
      src={url}
      alt={description}
      loading="lazy"
    />
  );
}

export default AlbumArt;
