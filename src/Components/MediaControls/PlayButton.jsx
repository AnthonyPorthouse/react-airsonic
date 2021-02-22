import { ReactComponent as Play } from "../../images/play.svg";
import { useContext } from "react";
import AudioContext from "../AudioContext";

function PlayButton() {
  /**
   * @type audio {Audio}
   */
  const audio = useContext(AudioContext);

  const play = (e) => {
    e.preventDefault();
    audio.play().catch(() => {});
  };

  return (
    <button className={`inline-block w-12`} title={`Play Track`} onClick={play}>
      <Play className={`w-full`} />
    </button>
  );
}

export default PlayButton;
