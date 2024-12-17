import { useAudioRef } from "@hooks/useAudio";
import { Play } from "lucide-react";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

function PlayButton() {
  const { t } = useTranslation("media");

  const audioRef = useAudioRef();

  const play = (e: SyntheticEvent) => {
    e.preventDefault();
    audioRef.current?.play().catch(() => {});
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

export default PlayButton;
