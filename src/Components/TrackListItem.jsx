import { addSeconds, lightFormat } from "date-fns";
import { ReactComponent as Play } from "../images/play.svg";

function TrackListItem({ track }) {
  const start = new Date(0, 0, 0, 0, 0, 0, 0);
  const end = addSeconds(start, track.duration);
  const time = lightFormat(end, "m:ss");

  const play = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`grid grid-flow-col auto-cols-max gap-6 align-items-center`}
    >
      <button onClick={play} className={`w-8 h-8`}>
        <span className={`sr-only`}>Play Track</span>
        <Play className={`w-4`} />
      </button>
      <span className={`w-12 text-right`}>
        {track.discNumber ? `${track.discNumber} / ` : null}
        {` ${track.track} `}
      </span>
      <span className={``}>{track.artist}</span>
      <span className={`w-full`}>{track.title}</span>
      <span className={`text-right`}>{time}</span>
    </div>
  );
}

export default TrackListItem;
