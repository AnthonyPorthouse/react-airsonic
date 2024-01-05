import { Helmet } from "react-helmet-async";

import { Song } from "../api/songs.js";

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

export default TitleInfo;
