import { ReactComponent as Stop } from "../../images/stop.svg";
import { useContext } from "react";
import AudioContext from "../AudioContext";

function StopButton() {
  /**
   * @type audio {Audio}
   */
  const audio = useContext(AudioContext);

  const stop = (e) => {
    e.preventDefault();
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <button
      className={`inline-block w-12 hidden md:block`}
      title={`Stop Track`}
      onClick={stop}
    >
      <Stop className={`w-full`} />
    </button>
  );
}

export default StopButton;
