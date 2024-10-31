import type { Song } from "@api/types.js";
import { memo } from "react";
import { Helmet } from "react-helmet-async";

interface TitleInfoProps {
  nowPlaying?: Song;
}

function TitleInfo({ nowPlaying }: Readonly<TitleInfoProps>) {
  if (!nowPlaying) {
    return (
      <Helmet>
        <title>Ra</title>
      </Helmet>
    );
  }

  return (
    <Helmet>
      <title>{`Ra | ${nowPlaying.artist} - ${nowPlaying.title}`}</title>
    </Helmet>
  );
}

export default memo(TitleInfo);
