import { ReactComponent as Pause } from "../../images/pause.svg";
import { useContext } from "react";
import AudioContext from "../Audio/AudioContext";

function PauseButton() {
  /**
   * @type audio {Audio}
   */
  const audio = useContext(AudioContext);

  const pause = (e) => {
    e.preventDefault();
    audio.pause();
  };

  return (
    <button
      className={`inline-block w-12`}
      title={`Pause Track`}
      onClick={pause}
    >
      <Pause className={`w-full`} />
    </button>
  );
}

export default PauseButton;
