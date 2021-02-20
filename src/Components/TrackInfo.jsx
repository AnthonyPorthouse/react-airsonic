import { useSelector } from "react-redux";
import { getSongById } from "../features/songSlice";

function TrackInfo({ track }) {
  const song = useSelector((state) => getSongById(state, track));

  return (
    <div className={`text-center`}>
      {song.album} - {song.title}
    </div>
  );
}

export default TrackInfo;
