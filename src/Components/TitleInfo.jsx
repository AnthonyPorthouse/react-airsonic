import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { getSongById } from "../features/songSlice";

function TitleInfo({ nowPlaying }) {
  const song = useSelector((state) => getSongById(state, nowPlaying));

  if (!nowPlaying) {
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
