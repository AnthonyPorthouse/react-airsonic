import { StopIcon } from "@heroicons/react/24/solid";
import { useAudio } from "@hooks/useAudio";
import { useTrackList } from "@hooks/useTrackList";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

function StopButton() {
  const { t } = useTranslation("media");
  const audio = useAudio();
  const { setTrackList } = useTrackList();

  const stop = (e: SyntheticEvent) => {
    e.preventDefault();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setTrackList([]);
    }
  };

  return (
    <button
      className={`hidden w-12 md:block`}
      title={t("stopTrack")}
      onClick={stop}
    >
      <StopIcon className={`w-full`} />
    </button>
  );
}

export default StopButton;
