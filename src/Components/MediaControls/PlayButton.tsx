import { useAudio } from "@hooks/useAudio";
import { Play } from "lucide-react";
import { SyntheticEvent, memo } from "react";
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
      <Play className={`w-full fill-black`} />
    </button>
  );
}

export default memo(PlayButton);
