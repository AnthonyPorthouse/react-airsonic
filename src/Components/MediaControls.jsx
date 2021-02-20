import { ReactComponent as Play } from "../images/play.svg";
import { ReactComponent as Pause } from "../images/pause.svg";
import { ReactComponent as Stop } from "../images/stop.svg";
import { ReactComponent as FastForward } from "../images/fast-forward.svg";
import { getNextTrack } from "../features/playlistSlice";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import AudioContext from "./AudioContext";

function MediaControls() {
  const dispatch = useDispatch();
  const audio = useContext(AudioContext);

  const skipTrack = (e) => {
    e.preventDefault();
    dispatch(getNextTrack());
  };

  const pause = (e) => {
    e.preventDefault();
    audio.pause();
  };

  const play = (e) => {
    e.preventDefault();
    audio.play().catch(() => {});
  };

  const stop = (e) => {
    e.preventDefault();
    audio.pause();
    audio.currentTime = 1;
  };

  return (
    <div className={`flex w-full`}>
      <button
        className={`inline-block w-6`}
        title={`Play Track`}
        onClick={play}
      >
        <Play className={`w-full`} />
      </button>
      <button
        className={`inline-block w-6`}
        title={`Pause Track`}
        onClick={pause}
      >
        <Pause className={`w-full`} />
      </button>
      <button
        className={`inline-block w-6`}
        title={`Stop Track`}
        onClick={stop}
      >
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
