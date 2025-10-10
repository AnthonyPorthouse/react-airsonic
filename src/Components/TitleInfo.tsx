import type { Song } from "@api/types.js";
import { t } from "i18next";
import { Helmet } from "react-helmet-async";

interface TitleInfoProps {
  nowPlaying?: Song;
}

function TitleInfo({ nowPlaying }: Readonly<TitleInfoProps>) {
  if (!nowPlaying) {
    return (
      <Helmet>
        <title>{t("common:title")}</title>
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
