import { PlayIcon } from "@heroicons/react/24/solid";
import { useAudio } from "@hooks/useAudio";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

function PlayButton() {
  const { t } = useTranslation("media");

  const audio = useAudio();

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
