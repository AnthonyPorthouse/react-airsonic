import { useAudio } from "@/Providers/AudioProvider.js";
import { StopIcon } from "@heroicons/react/24/solid";
import { useTrackList } from "@providers/TrackListProvider.js";
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
