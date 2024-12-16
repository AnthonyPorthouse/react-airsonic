import { useAudioRef } from "@hooks/useAudio";
import { Pause } from "lucide-react";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

function PauseButton() {
  const { t } = useTranslation("media");
  const audioRef = useAudioRef();

  const pause = (e: SyntheticEvent) => {
    e.preventDefault();
    audioRef.current?.pause();
  };

  return (
    <button
      className={`inline-block w-12`}
      title={t("pauseTrack")}
      onClick={pause}
    >
      <Pause className={`w-full fill-black`} />
    </button>
  );
}

export default PauseButton;
