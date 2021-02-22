import { useSelector } from "react-redux";
import { getSongById } from "../features/songSlice";

function TrackInfo({ track }) {
  const song = useSelector((state) => getSongById(state, track));

  return (
    <div className={`grid text-left w-full`}>
      <span className={`font-bold truncate`}>{song.title}</span>
      <span className={`truncate`}>{song.artist}</span>
    </div>
  );
}

export default TrackInfo;
