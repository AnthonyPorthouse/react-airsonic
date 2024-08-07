import { useAudio } from "@/Providers/AudioProvider.js";
import { PauseIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

function PauseButton() {
  const { t } = useTranslation("media");
  /**
   * @type audio {Audio}
   */
  const audio = useAudio();

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
