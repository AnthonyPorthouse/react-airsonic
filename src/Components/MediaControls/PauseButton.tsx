import { useAudio } from "@hooks/useAudio";
import { Pause } from "lucide-react";
import { SyntheticEvent, memo } from "react";
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
      <Pause fill="#000" className={`w-full`} />
    </button>
  );
}

export default memo(PauseButton);
