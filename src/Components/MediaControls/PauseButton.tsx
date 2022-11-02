import { PauseIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent, useContext } from "react";
import { useTranslation } from "react-i18next";

import AudioContext from "../Audio/AudioContext";

function PauseButton() {
  const { t } = useTranslation("media");
  /**
   * @type audio {Audio}
   */
  const audio = useContext(AudioContext);

  const pause = (e: SyntheticEvent) => {
    e.preventDefault();
    audio?.pause();
  };

  return (
    <button
      className={`inline-block w-12`}
      title={t("pauseTrack")}
      onClick={pause}
    >
      <PauseIcon className={`w-full`} />
    </button>
  );
}

export default PauseButton;
