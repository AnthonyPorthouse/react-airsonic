import { ReactComponent as Play } from "../../images/play.svg";
import { SyntheticEvent, useContext } from "react";
import AudioContext from "../Audio/AudioContext";
import { useTranslation } from "react-i18next";

function PlayButton() {
  const { t } = useTranslation("media");

  /**
   * @type audio {Audio}
   */
  const audio = useContext(AudioContext);

  const play = (e: SyntheticEvent) => {
    e.preventDefault();
    audio?.play().catch(() => {});
  };

  return (
    <button
      className={`inline-block w-12`}
      title={t("playTrack")}
      onClick={play}
    >
      <Play className={`w-full`} />
    </button>
  );
}

export default PlayButton;
