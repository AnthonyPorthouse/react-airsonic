import { PlayIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent, useContext } from "react";
import { useTranslation } from "react-i18next";

import AudioContext from "../Audio/AudioContext";

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
      <PlayIcon className={`w-full`} />
    </button>
  );
}

export default PlayButton;
