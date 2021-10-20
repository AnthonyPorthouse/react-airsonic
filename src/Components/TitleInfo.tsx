import { Helmet } from "react-helmet-async";
import { useAppSelector } from "../app/hooks";
import { getSongById } from "../app/features/songSlice";

interface TitleInfoProps {
  nowPlaying?: string;
}

function TitleInfo({ nowPlaying }: TitleInfoProps) {
  const song = useAppSelector((state) => getSongById(state, nowPlaying));

  if (!nowPlaying || !song) {
    return (
      <Helmet>
        <title>Ra</title>
      </Helmet>
    );
  }

  return (
    <Helmet>
      <title>{`Ra | ${song.artist} - ${song.title}`}</title>
    </Helmet>
  );
}

export default TitleInfo;
