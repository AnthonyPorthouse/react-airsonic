import { ReactComponent as Play } from "../images/play.svg";
import { ReactComponent as Pause } from "../images/pause.svg";
import { ReactComponent as Stop } from "../images/stop.svg";
import { ReactComponent as FastForward } from "../images/fast-forward.svg";
import { getNextTrack } from "../features/playlistSlice";
import { useDispatch } from "react-redux";

function MediaControls() {
  const dispatch = useDispatch();

  const skipTrack = (e) => {
    e.preventDefault();
    dispatch(getNextTrack());
  };

  return (
    <div className={`flex w-full justify-center`}>
      <button className={`inline-block w-6`} title={`Play Track`}>
        <Play className={`w-full`} />
      </button>
      <button className={`inline-block w-6`} title={`Pause Track`}>
        <Pause className={`w-full`} />
      </button>
      <button className={`inline-block w-6`} title={`Stop Track`}>
        <Stop className={`w-full`} />
      </button>
      <button
        onClick={skipTrack}
        className={`inline-block w-6`}
        title={`Next Track`}
      >
        <FastForward className={`w-full`} />
      </button>
    </div>
  );
}

export default MediaControls;
