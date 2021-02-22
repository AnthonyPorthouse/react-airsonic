import { useSelector } from "react-redux";
import { getSongById } from "../features/songSlice";

function TrackInfo({ track }) {
  const song = useSelector((state) => getSongById(state, track));

  return (
    <div className={`grid text-left`}>
      <span className={`font-bold`}>{song.title}</span>
      <span>{song.artist}</span>
    </div>
  );
}

export default TrackInfo;
