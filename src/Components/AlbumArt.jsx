import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import { getCoverArtUrl } from "../features/api";

function AlbumArt({ id, description }) {
  const auth = useSelector(selectAuth);

  const url = getCoverArtUrl({ id, ...auth });
  return (
    <div>
      <img
        className={`rounded overflow-hidden w-64 h-64`}
        src={url}
        alt={description}
        loading="lazy"
      />
    </div>
  );
}

export default AlbumArt;
